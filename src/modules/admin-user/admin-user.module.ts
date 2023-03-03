import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';

@Module({
  imports: [ConfigModule],
  controllers: [AdminUserController],
  providers: [AdminUserService],
})
export class AdminUserModule {}
