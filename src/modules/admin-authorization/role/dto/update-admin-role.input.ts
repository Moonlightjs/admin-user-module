import { AdminPolicyUpdateNesteds } from '@modules/admin-authorization/policy/dto/admin-policy-nested.input';
import { CreateAdminRoleInput } from '@modules/admin-authorization/role/dto/create-admin-role.input';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@Expose()
export class UpdateAdminRoleInput extends PartialType(
  OmitType(CreateAdminRoleInput, ['policies']),
) {
  @ApiProperty({ required: true, type: () => AdminPolicyUpdateNesteds })
  @ValidateNested()
  @Type(() => AdminPolicyUpdateNesteds)
  @Expose()
  public readonly policies: AdminPolicyUpdateNesteds;
}
