import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { GetAllUserDto } from 'src/dto/get-all-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import {
  getErrorMessage,
  getSuccessMessage,
} from 'src/utils/response-functions.utils';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard('bearer'))
  async createUser(@Body() data: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(data);

      return newUser;
    } catch (error) {
      return error.message;
    }
  }

  @Get()
  @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard('bearer'))
  async getAllUser(@Query() data: GetAllUserDto) {
    const users = await this.userService.getAllUser(data);

    return getSuccessMessage(users);
  }

  @Get('/:id/orders')
  async getAllUserOrders(@Param('id') id) {
    const result = await this.userService.getAllUserOrders(id);
    return result;
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard('bearer'))
  async loginUser(@Body() data: LoginDto) {
    const user = await this.userService.loginUser(data);
    if (user) {
      return user;
    }
    return getErrorMessage('email or password incorrect');
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard('bearer'))
  async updateUser(@Param('id') id, @Body() data: UpdateUserDto) {
    const updateUser = await this.userService.updateUser(id, data);
    return updateUser;
  }

  @Delete('/:id')
  // @UseGuards(AuthGuard('bearer'))
  async deleteUser(@Param('id') id) {
    const deletedUser = await this.userService.deleteUser(id);
    return deletedUser;
  }
}
