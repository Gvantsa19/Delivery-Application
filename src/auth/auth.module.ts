import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HttpBearerStrategy } from './http-bearer.strategy';
import { UserModule } from '../user/user.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
    }),
    UserModule,
    AdminModule,
  ],
  providers: [HttpBearerStrategy],
  exports: [HttpBearerStrategy],
})
export class AuthModule {}
