import { AdminAuthenticationModule } from '@modules/admin-authentication/admin-authentication.module';
import { AdminPermissionsGuard } from '@modules/admin-authorization/permission';
import { AdminAuthorizationModule } from '@modules/admin-authorization/admin-authorization.module';
import { AdminRolesGuard } from '@modules/admin-authorization/role';
import { AdminUserModule } from '@modules/admin-user/admin-user.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AdminAuthenticationModule,
    AdminAuthorizationModule,
    AdminUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AdminRolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminPermissionsGuard,
    },
  ],
})
export class AppModule {}
