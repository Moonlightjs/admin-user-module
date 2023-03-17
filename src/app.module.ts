import { AdminAuthenticationModule } from '@modules/admin-authentication/admin-authentication.module';
import { AdminAuthorizationModule } from '@modules/admin-authorization/admin-authorization.module';
import { AdminPermissionsGuard } from '@modules/admin-authorization/permission';
import { AdminRolesGuard } from '@modules/admin-authorization/role';
import { AdminUserModule } from '@modules/admin-user/admin-user.module';
import { logQueryEvent, PrismaModule } from '@moonlightjs/common';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: {
          log: [
            {
              emit: 'event',
              level: 'query',
            },
            {
              emit: 'stdout',
              level: 'error',
            },
            {
              emit: 'stdout',
              level: 'info',
            },
            {
              emit: 'stdout',
              level: 'warn',
            },
          ],
          errorFormat: 'colorless',
        },
        events: {
          query: logQueryEvent,
        },
      },
    }),
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
