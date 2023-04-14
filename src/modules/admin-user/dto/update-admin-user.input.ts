import { AdminPolicyUpdateNesteds } from '@modules/admin-authorization/policy/dto/admin-policy-nested.input';
import { AdminRoleUpdateNesteds } from '@modules/admin-authorization/role/dto/admin-role-nested.input';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateAdminUserInput {
  @ApiProperty({ required: false, nullable: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly email?: string;

  @ApiProperty({ required: false, nullable: true, type: String })
  @IsString()
  @Expose()
  public readonly firstName?: string;

  @ApiProperty({ required: false, nullable: true, type: String })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly lastName?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Expose()
  public readonly displayName?: string;

  @ApiProperty({ required: false, type: () => AdminRoleUpdateNesteds })
  @ValidateNested()
  @Type(() => AdminRoleUpdateNesteds)
  @Expose()
  public readonly roles?: AdminRoleUpdateNesteds;

  @ApiProperty({ required: false, type: () => AdminPolicyUpdateNesteds })
  @ValidateNested()
  @Type(() => AdminPolicyUpdateNesteds)
  @Expose()
  public readonly policies?: AdminPolicyUpdateNesteds;
}
