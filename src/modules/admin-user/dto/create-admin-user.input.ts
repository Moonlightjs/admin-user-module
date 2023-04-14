import { AdminRoleCreateNesteds } from '@modules/admin-authorization/role/dto';
import { AdminPolicyCreateNesteds } from '@modules/admin-authorization/policy/dto';
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
export class CreateAdminUserInput {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly username: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly password: string;

  @ApiProperty({ required: false, nullable: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly email?: string;

  @ApiProperty({ required: false, nullable: true, type: String })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly firstName?: string;

  @ApiProperty({ required: false, nullable: true, type: String })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly lastName?: string;

  @ApiProperty({ required: false, nullable: true, type: String })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly displayName?: string | null;

  @ApiProperty({ required: false, type: () => AdminRoleCreateNesteds })
  @ValidateNested()
  @Type(() => AdminRoleCreateNesteds)
  @Expose()
  public readonly roles?: AdminRoleCreateNesteds;

  @ApiProperty({ required: true, type: () => AdminPolicyCreateNesteds })
  @ValidateNested()
  @Type(() => AdminPolicyCreateNesteds)
  @Expose()
  public readonly policies: AdminPolicyCreateNesteds;
}
