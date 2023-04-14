import { CreateAdminPermissionInput } from './create-admin-permission.input';
import { PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class UpdateAdminPermissionInput extends PartialType(
  CreateAdminPermissionInput,
) {}
