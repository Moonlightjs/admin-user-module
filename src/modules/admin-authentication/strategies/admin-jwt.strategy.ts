import { AdminJwtPayload } from '@modules/admin-authentication/admin-jwt-payload';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as httpContext from 'express-http-context';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        'ADMIN_JWT_ACCESS_TOKEN_PUBLIC_KEY',
      ),
      passReqToCallback: true,
    });
  }

  async validate(request: any, payload: AdminJwtPayload) {
    httpContext.set('admin-user', payload);
    request.adminUser = payload;
  }
}
