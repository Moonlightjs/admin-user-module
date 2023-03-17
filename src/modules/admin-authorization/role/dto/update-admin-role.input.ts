import {
  AdminPermissionId,
  CreateAdminRoleInput,
} from '@modules/admin-authorization/role/dto/create-admin-role.input';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

export class AdminPermissionsUpdateNested {
  @ApiProperty({ required: false, isArray: true, type: AdminPermissionId })
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => AdminPermissionId)
  set?: AdminPermissionId[];
}

@Expose()
export class UpdateAdminRoleInput extends PartialType(
  OmitType(CreateAdminRoleInput, ['permissions']),
) {
  @ApiProperty({ required: true })
  @ValidateNested()
  @Type(() => AdminPermissionsUpdateNested)
  @Expose()
  public readonly permissions: AdminPermissionsUpdateNested;
}
