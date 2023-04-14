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
import * as httpContext from 'express-http-context';
import { AdminJwtPayload } from '@modules/admin-authentication/admin-jwt-payload';
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
        middlewares: [
          async (params, next) => {
            console.log('🚀 ---------------------------------------------🚀');
            console.log('🚀 ~ file: app.module.ts:44 ~ params:', params);
            console.log('🚀 ---------------------------------------------🚀');
            const user = httpContext.get('user') as AdminJwtPayload;
            const originalUrl = httpContext.get('originalUrl') as string;
            if (user) {
              if (params.action === 'create') {
                params.args.data.createdById = user.sub;
                params.args.data.createdBy = user.username;
              }
              if (params.action === 'update') {
                params.args.data.updatedById = user.sub;
                params.args.data.updatedBy = user.username;
              }
              // if (params.action === 'delete') {
              //   params.args.data.deletedById = user.sub;
              //   params.args.data.deletedBy = user.username;
              // }
            }
            return next(params);
          },
        ],
      },
    }),
    AdminAuthenticationModule,
    AdminAuthorizationModule,
    AdminUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
