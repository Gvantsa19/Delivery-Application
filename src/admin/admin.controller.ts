import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAdmin } from 'src/dto/create-admin.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UpdateAdminDto } from 'src/dto/update-admin.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { AdminService } from './admin.service';

@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/registration')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('bearer'))
  async createAdmin(@Body() data: CreateAdmin) {
    try {
      const result = await this.adminService.createAdmin(data);
      return getSuccessMessage(result);
    } catch (err) {
      if (err.code === 11000) {
        return getErrorMessage(
          `Could not create admin with email ${data.email} as it already exists`,
        );
      } else {
        return getErrorMessage('Could not Create admin: ' + err.message);
      }
    }
  }

  @Post('/login')
  async loginAdmin(@Body() data: LoginDto) {
    try {
      const result = await this.adminService.loginAdmin(data);
      if (result) {
        return getSuccessMessage(result);
      } else {
        return getErrorMessage('admiNname or password incorrect');
      }
    } catch (err) {
      return getErrorMessage(err.message);
    }
  }

  @Patch('update')
  @UseGuards(AuthGuard('bearer'))
  async updateAdmin(@Body() data: UpdateAdminDto, @Req() req) {
    try {
      const updatedAdmin = await this.adminService.updateAdmin(
        req.user.id,
        data,
      );
      return getSuccessMessage(updatedAdmin);
    } catch (err) {
      return getErrorMessage(err.message);
    }
  }
  @Delete('delete')
  @UseGuards(AuthGuard('bearer'))
  async deleteAdmin(@Req() req) {
    try {
      const updatedAdmin = await this.adminService.deleteAdmin(req.user.id);
      return getSuccessMessage(updatedAdmin);
    } catch (err) {
      return getErrorMessage(err.message);
    }
  }

  @Get()
  @UseGuards(AuthGuard('bearer'))
  async getAllAdmin() {
    try {
      const admins = await this.adminService.getAllAdmin();
      return getSuccessMessage(admins);
    } catch (err) {
      return getErrorMessage(err.message);
    }
  }
}
