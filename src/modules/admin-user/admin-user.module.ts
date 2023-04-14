import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { AdminAuthorizationModule } from '@modules/admin-authorization/admin-authorization.module';

@Module({
  imports: [ConfigModule, AdminAuthorizationModule],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
