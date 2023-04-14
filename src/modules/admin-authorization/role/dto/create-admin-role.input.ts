import { AdminPolicyCreateNesteds } from '@modules/admin-authorization/policy/dto/admin-policy-nested.input';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

@Expose()
export class CreateAdminRoleInput {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly name: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly code: string;

  @ApiProperty({ required: false, type: String })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly description?: string | null;

  @ApiProperty({ required: true, type: () => AdminPolicyCreateNesteds })
  @ValidateNested()
  @Type(() => AdminPolicyCreateNesteds)
  @Expose()
  public readonly policies: AdminPolicyCreateNesteds;
}
