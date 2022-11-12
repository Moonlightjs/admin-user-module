import { AdminUser, AdminRole, AdminPermission } from '@prisma/client';
export type AdminLoginInfoType = AdminUser & {
  roles: (AdminRole & {
    permissions: AdminPermission[];
  })[];
};
