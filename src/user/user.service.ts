import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/interface/user.interface';
import { Order } from 'src/interface/order.interface';
import { GetAllUserDto } from 'src/dto/get-all-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    @InjectModel('Order')
    private orderModel: Model<Order>,
  ) {}

  //create user
  async createUser(data: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedpass = await bcrypt.hash(data.password, salt);
    const newUser = new this.userModel({
      fullName: data.fullName,
      email: data.email,
      password: hashedpass,
      phoneNumber: data.phoneNumber,
      creditCard: data.creditCard,
      address: data.address,
    });
    await newUser.save();

    return {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      creditCard: newUser.creditCard,
      address: newUser.address,
      loginDate: newUser.loginDate,
      role: newUser.role,
    };
  }

  //get all user for admins
  async getAllUser(data: GetAllUserDto): Promise<User[]> {
    const query = await this.userModel.find();
    if (data.sort) {
      query.sort(data.sort);
    }
    if (data.limit) {
      const limit = Number(data.limit);
      const page = data.page ? Number(data.page) - 1 : 0;

      query.limit(limit);
      query.skip(page);
    } else {
      query.limit(25);
    }

    if (query) {
      const userRes = query.map((newUser) => ({
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        // password: newUser.password,
        phoneNumber: newUser.phoneNumber,
        creditCard: newUser.creditCard,
        loginDate: newUser.loginDate,
        address: newUser.address,
      }));
      return userRes;
    }
    return [];
  }

  //get users orders
  async getAllUserOrders(id: string) {
    const result = this.orderModel.find();
    result.where('user').equals(id);

    return await result;
  }

  //login user
  async loginUser(data: LoginDto) {
    const findUser = this.userModel.findOne({
      email: data.email,
    });
    findUser.select(' email password');

    const foundUser = await findUser;
    if (!foundUser) {
      return false;
    }

    if (foundUser) {
      const isMatch = await bcrypt.compare(data.password, foundUser.password);
      if (isMatch) {
        const token = String(Math.random()) + String(Date.now());
        await this.userModel.findByIdAndUpdate(foundUser.id, {
          token,
          loginDate: new Date(),
        });
        return {
          user: foundUser,
          token,
          loginDate: new Date(),
        };
      }
    }
    return false;
  }

  // find user by token
  async findUserByToken(token: string) {
    const foundUser = await this.userModel.find({
      token,
    });

    return foundUser ? foundUser : false;
  }

  // update user properties
  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const updatedUser = this.userModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );

    return await updatedUser;
  }

  // delete user
  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (deletedUser) {
      return getSuccessMessage(deletedUser);
    }
    return getErrorMessage('unsuccess');
  }
}
