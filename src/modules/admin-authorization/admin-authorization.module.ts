import { AdminPermissionController } from '@modules/admin-authorization/permission/admin-permission.controller';
import { AdminPermissionService } from '@modules/admin-authorization/permission/admin-permission.service';
import { AdminRoleController } from '@modules/admin-authorization/role/admin-role.controller';
import { AdminRoleService } from '@modules/admin-authorization/role/admin-role.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AdminRoleController, AdminPermissionController],
  providers: [AdminRoleService, AdminPermissionService],
})
export class AdminAuthorizationModule {}
