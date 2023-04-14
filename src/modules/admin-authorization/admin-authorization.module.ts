import { AdminPermissionController } from '@modules/admin-authorization/permission/admin-permission.controller';
import { AdminPermissionService } from '@modules/admin-authorization/permission/admin-permission.service';
import { AdminRoleController } from '@modules/admin-authorization/role/admin-role.controller';
import { AdminRoleService } from '@modules/admin-authorization/role/admin-role.service';
import { Module } from '@nestjs/common';
import { AdminPolicyController } from './policy/admin-policy.controller';
import { AdminPolicyService } from './policy/admin-policy.service';

@Module({
  controllers: [
    AdminRoleController,
    AdminPermissionController,
    AdminPolicyController,
  ],
  providers: [AdminRoleService, AdminPermissionService, AdminPolicyService],
  exports: [AdminRoleService, AdminPermissionService, AdminPolicyService],
})
export class AdminAuthorizationModule {}
