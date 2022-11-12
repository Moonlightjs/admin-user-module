import { SetMetadata } from '@nestjs/common';

export const ADMIN_REQUIRE_PERMISSIONS_KEY = 'admin_require_permissions';
export const RequireAdminPermissions = (...permissions: string[]) =>
  SetMetadata(ADMIN_REQUIRE_PERMISSIONS_KEY, permissions);
