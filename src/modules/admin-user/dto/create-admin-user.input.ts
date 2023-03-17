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
export class AdminRoleId {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  id: string;
}

@Expose()
export class AdminRoleCreateNested {
  @ApiProperty({ required: true, isArray: true, type: AdminRoleId })
  @ValidateNested()
  @IsArray()
  @Type(() => AdminRoleId)
  @Expose()
  connect: AdminRoleId[];
}

@Expose()
export class CreateAdminUserInput {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly username: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly password: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly email?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly firstName?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly lastName?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly displayName?: string | null;

  @ApiProperty({ required: false })
  @ValidateNested()
  @Type(() => AdminRoleCreateNested)
  @Expose()
  public readonly roles?: AdminRoleCreateNested;
}
