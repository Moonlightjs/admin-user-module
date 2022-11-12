import { CreateAdminPermissionInput } from '@modules/admin-authorization/permission/dto/create-admin-permission.input';
import { PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class UpdateAdminPermissionInput extends PartialType(
  CreateAdminPermissionInput,
) {}
