import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from 'src/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpBearerStrategy } from 'src/auth/http-bearer.strategy';
import { OrderSchema } from 'src/entities/order.entity';
import { AdminSchema } from 'src/entities/admin.entity';
import { AdminService } from 'src/admin/admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
  ],
  providers: [UserService, HttpBearerStrategy, AdminService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
