import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    OrdersModule,
    UserModule,
    AdminModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://zeusShaurma:908YN0STn8YRy1n6@cluster0.50vqf.mongodb.net/zeusshawarma?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
