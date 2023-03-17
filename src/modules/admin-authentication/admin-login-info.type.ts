import { AdminPermission, AdminRole, AdminUser } from '@prisma/client';
export type AdminLoginInfoType = AdminUser & {
  roles: (AdminRole & {
    permissions: AdminPermission[];
  })[];
};
