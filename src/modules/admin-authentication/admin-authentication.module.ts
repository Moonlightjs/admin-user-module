import { AdminAuthenticationController } from '@modules/admin-authentication/admin-authentication.controller';
import { AdminAuthenticationService } from '@modules/admin-authentication/admin-authentication.service';
import { adminAccessTokenOption } from '@modules/admin-authentication/admin-jwt-sign-option';
import {
  AdminLocalStrategy,
  AdminJwtRefreshTokenStrategy,
  AdminJwtStrategy,
} from '@modules/admin-authentication/strategies';
import { AdminUserModule } from '@modules/admin-user/admin-user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '@src/infra/prisma/prisma.service';

@Module({
  controllers: [AdminAuthenticationController],
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          privateKey: configService.get('ADMIN_JWT_ACCESS_TOKEN_SECRET_KEY'),
          publicKey: configService.get('ADMIN_JWT_ACCESS_TOKEN_PUBLIC_KEY'),
          signOptions: {
            ...adminAccessTokenOption(configService),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AdminAuthenticationService,
    PrismaService,
    AdminLocalStrategy,
    AdminJwtStrategy,
    AdminJwtRefreshTokenStrategy,
  ],
  exports: [AdminAuthenticationService, JwtModule],
})
export class AdminAuthenticationModule {}
