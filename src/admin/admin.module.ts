import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpBearerStrategy } from 'src/auth/http-bearer.strategy';
import { AdminSchema } from 'src/entities/admin.entity';
import { OrderSchema } from 'src/entities/order.entity';
import { UserSchema } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  providers: [UserService, HttpBearerStrategy, AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
