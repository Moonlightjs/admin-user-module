import { SetMetadata } from '@nestjs/common';

export const ADMIN_ROLES_KEY = 'admin-roles';
export const Roles = (...roles: string[]) =>
  SetMetadata(ADMIN_ROLES_KEY, roles);
