import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/admin/admin.module';
import { HttpBearerStrategy } from 'src/auth/http-bearer.strategy';
import { AdminSchema } from 'src/entities/admin.entity';
import { OrderSchema } from 'src/entities/order.entity';
import { UserSchema } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    AdminModule,
  ],
  controllers: [OrdersController],

  providers: [OrdersService, HttpBearerStrategy],
})
export class OrdersModule {}
