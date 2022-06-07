import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class HttpBearerStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {
    super();
  }
  async validate(token: string) {
    const foundAdmin = await this.adminService.findAdminByToken(token);

    if (foundAdmin) {
      if (foundAdmin.isDeleted === true) {
        return false;
      }

      return foundAdmin;
    } else {
      const foundUser = await this.userService.findUserByToken(token);
      if (foundUser) {
        // if (foundUser.isDeleted === true) {
        //   return false;
        // }

        return foundUser;
      } else {
        return false;
      }
    }
  }
}
