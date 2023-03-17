import { AdminRoleId } from '@modules/admin-user/dto/create-admin-user.input';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@Expose()
export class AdminRoleUpdateNested {
  @ApiProperty({ required: true, isArray: true, type: AdminRoleId })
  @ValidateNested()
  @IsArray()
  @Type(() => AdminRoleId)
  @Expose()
  set: AdminRoleId[];
}

export class UpdateAdminUserInput {
  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly email?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @Expose()
  public readonly firstName?: string;

  @ApiProperty({ required: false, nullable: true })
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

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => AdminRoleUpdateNested)
  @Expose()
  public readonly roles?: AdminRoleUpdateNested;
}
