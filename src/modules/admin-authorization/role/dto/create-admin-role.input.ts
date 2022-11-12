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

export class AdminPermissionId {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class AdminPermissionsCreateNested {
  @ApiProperty({ required: false, isArray: true, type: AdminPermissionId })
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => AdminPermissionId)
  connect?: AdminPermissionId[];
}

@Expose()
export class CreateAdminRoleInput {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly name: string;
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly code: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly description?: string | null;
  @ApiProperty({ required: true })
  @ValidateNested()
  @Type(() => AdminPermissionsCreateNested)
  @Expose()
  public readonly permissions: AdminPermissionsCreateNested;
}
