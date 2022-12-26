import { AdminAuthenticationService } from '@modules/admin-authentication/admin-authentication.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AdminUserErrorCodes } from '@src/constants';
import { HttpErrorException } from '@moonlightjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(
    protected _adminAuthenticationService: AdminAuthenticationService,
  ) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    request: any,
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this._adminAuthenticationService.validateUser({
      username,
      password,
    });
    if (!user) {
      throw new HttpErrorException(AdminUserErrorCodes.UserNotExists);
    }
    if (user.isActive === false) {
      throw new HttpErrorException(AdminUserErrorCodes.UserDeactivated);
    }
    if (user?.deletedAt) {
      throw new HttpErrorException(AdminUserErrorCodes.UserDeleted);
    }
    request.userAdmin = user;
  }
}
