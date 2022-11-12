import { AdminJwtPayload } from '@modules/admin-authentication/admin-jwt-payload';
import {
  adminAccessTokenOption,
  adminRefreshTokenOption,
} from '@modules/admin-authentication/admin-jwt-sign-option';
import { AdminLoginInfoType } from '@modules/admin-authentication/admin-login-info.type';
import {
  AdminLoginDto,
  AdminLoginInput,
  AdminRefreshTokenDto,
} from '@modules/admin-authentication/dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions, JwtService } from '@nestjs/jwt';
import { ErrorCodes } from '@src/constants';
import { PrismaService } from '@src/infra/prisma/prisma.service';
import { Nullable, HttpErrorException, toDto } from '@moonlightjs/common';
import * as bcrypt from 'bcrypt';
import { AdminUserProfileDto } from '@modules/admin-user/dto';

@Injectable()
export class AdminAuthenticationService {
  protected readonly _accessTokenOption: JwtSignOptions;
  protected readonly _refreshTokenOption: JwtSignOptions;
  constructor(
    protected prisma: PrismaService,
    protected jwtService: JwtService,
    protected configService: ConfigService,
  ) {
    this._accessTokenOption = adminAccessTokenOption(configService);
    this._refreshTokenOption = adminRefreshTokenOption(configService);
  }

  async validateUser(
    input: AdminLoginInput,
  ): Promise<Nullable<AdminLoginInfoType>> {
    const user = await this.prisma.adminUser.findFirst({
      where: {
        username: input.username,
      },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });
    if (user) {
      if (!user.password) {
        throw new HttpErrorException(ErrorCodes.PasswordInvalid);
      }
      const isPasswordMatching = await bcrypt.compare(
        input.password,
        user.password,
      );
      if (isPasswordMatching) {
        return user;
      }
      throw new HttpErrorException(ErrorCodes.PasswordInvalid);
    }
    return null;
  }

  async login(user: AdminLoginInfoType): Promise<AdminLoginDto> {
    this.prisma.adminUser
      .update({
        where: {
          id: user.id,
        },
        data: {
          lastLogin: new Date(),
        },
      })
      .then();
    const roles = user.roles ? user.roles.map((role) => role.code) : [];
    const permissions: string[] = [];
    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        permissions.push(permission.action);
      });
    });
    const payload: AdminJwtPayload = {
      username: user.username,
      sub: user.id,
      roles,
      permissions,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, this._refreshTokenOption),
      user: toDto(AdminUserProfileDto, user),
    };
  }

  async refreshToken(
    payloadRefreshToken: AdminJwtPayload,
  ): Promise<AdminRefreshTokenDto> {
    {
      const user = await this.prisma.adminUser.findFirst({
        where: {
          id: payloadRefreshToken.sub,
        },
        include: {
          roles: {
            include: {
              permissions: true,
            },
          },
        },
      });
      if (!user) {
        throw new HttpErrorException(ErrorCodes.UserNotExists);
      }
      const roles = user.roles ? user.roles.map((role) => role.code) : [];
      const permissions: string[] = [];
      user.roles.forEach((role) => {
        role.permissions.forEach((permission) => {
          permissions.push(permission.action);
        });
      });
      const payload: AdminJwtPayload = {
        username: payloadRefreshToken.username,
        sub: payloadRefreshToken.sub,
        roles,
        permissions,
      };
      return {
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, this._refreshTokenOption),
      };
    }
  }
}
