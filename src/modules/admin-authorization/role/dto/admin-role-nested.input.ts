import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsUUID, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';

@Expose()
export class AdminRoleId {
  @ApiProperty({ required: true, type: String })
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  id: string;
}

@Expose()
export class AdminRoleCreateNesteds {
  @ApiProperty({ required: true, isArray: true, type: () => AdminRoleId })
  @ValidateNested()
  @IsArray()
  @Type(() => AdminRoleId)
  @Expose()
  connect: AdminRoleId[];
}

@Expose()
export class AdminRoleUpdateNesteds {
  @ApiProperty({ required: true, isArray: true, type: () => AdminRoleId })
  @ValidateNested()
  @IsArray()
  @Type(() => AdminRoleId)
  @Expose()
  set: AdminRoleId[];
}
