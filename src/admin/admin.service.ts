import { Get, Injectable } from '@nestjs/common';
import { CreateAdmin } from 'src/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'src/interface/admin.interface';
import { Model } from 'mongoose';
import { LoginDto } from 'src/dto/login.dto';
import { sha256 } from 'js-sha256';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/interface/user.interface';

import { UpdateAdminDto } from 'src/dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin')
    private adminModel: Model<Admin>,
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  //register admin
  async createAdmin(data: CreateAdmin): Promise<Admin> {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(data.password, salt);
    const newAdmin = new this.adminModel({
      email: data.email,
      hash: hashedPass,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      registrationDate: new Date(),
      salt,
    });
    await newAdmin.save();
    return {
      id: newAdmin._id,
      fullName: newAdmin.fullName,
      email: newAdmin.email,
      registrationDate: newAdmin.registrationDate,
      phoneNumber: newAdmin.phoneNumber,
    };
  }

  //login admin
  async loginAdmin(data: LoginDto) {
    const findAdmin = this.adminModel.findOne({
      email: data.email,
    });
    findAdmin.select('fullName id email hash');

    const foundAdmin = await findAdmin;

    if (!foundAdmin) {
      return false;
    }
    const isPsswordMatch = await bcrypt.compare(data.password, foundAdmin.hash);

    if (isPsswordMatch) {
      const token = sha256(
        String(Math.random()) +
          String(uuidv4()) +
          String(Date.now()) +
          foundAdmin.id,
      );

      await this.adminModel.findByIdAndUpdate(foundAdmin.id, {
        token,
        loginDate: new Date(),
      });
      return {
        admin: {
          email: foundAdmin.email,
          fullName: foundAdmin.fullName,
          id: foundAdmin.id,
        },
        token,
      };
    }
    return false;
  }

  // update admin properties
  async updateAdmin(id: string, data: UpdateAdminDto) {
    let newData = {};
    if (data.password) {
      const salt = await bcrypt.genSalt();

      const hash = await bcrypt.hash(data.password, salt);
      delete data.password;
      newData = { ...data, hash };
    } else {
      newData = data;
    }

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      id,
      { ...newData },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      },
    );
    return {
      fullName: updatedAdmin.fullName,
      email: updatedAdmin.email,
      registrationDate: updatedAdmin.registrationDate,
      phoneNumber: updatedAdmin.phoneNumber,
    };
  }
  // update admin properties
  async deleteAdmin(id: string) {
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      id,
      { isDeleted: false },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      },
    );
    return {
      fullName: updatedAdmin.fullName,
      email: updatedAdmin.email,
      registrationDate: updatedAdmin.registrationDate,
      phoneNumber: updatedAdmin.phoneNumber,
    };
  }

  //get all admins
  async getAllAdmin(): Promise<Admin[]> {
    const admin = await this.adminModel.find();
    if (admin) {
      const adminRes = admin.map((newAdmin) => ({
        id: newAdmin._id,
        fullName: newAdmin.fullName,
        email: newAdmin.email,
        hash: newAdmin.hash,
        phoneNumber: newAdmin.phoneNumber,
        token: newAdmin.token,
        isDeleted: newAdmin.isDeleted,
      }));
      return adminRes;
    }
    return [];
  }

  // find admin by token
  async findAdminByToken(token: string): Promise<Admin> {
    const foundAdmin: Admin = await this.adminModel.findOne({
      token,
    });
    return foundAdmin ? foundAdmin : null;
  }
}
