import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

const adminAccessTokenOption = (
  configService: ConfigService,
): JwtSignOptions => {
  const jwtAccessTokenExpirationTime = configService.get(
    'ADMIN_JWT_ACCESS_TOKEN_EXPIRATION_TIME',
  );
  return {
    algorithm: 'RS256',
    // privateKey: configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
    expiresIn: jwtAccessTokenExpirationTime
      ? `${jwtAccessTokenExpirationTime}s`
      : 15 * 60, // 15 minutes
    issuer: configService.get('JWT_ISSUER') || 'thangho98@dev.com',
  };
};

const adminRefreshTokenOption = (
  configService: ConfigService,
): JwtSignOptions => {
  const jwtRefreshTokenExpirationTime = configService.get(
    'ADMIN_JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  );
  return {
    algorithm: 'HS256',
    secret: configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
    expiresIn: jwtRefreshTokenExpirationTime
      ? `${jwtRefreshTokenExpirationTime}s`
      : 60 * 60 * 24 * 3, // 3 months
    issuer: configService.get('JWT_ISSUER') || 'thangho98@dev.com',
  };
};
export { adminAccessTokenOption, adminRefreshTokenOption };
