import { AdminRoleDto } from '@modules/admin-authorization/role/dto/admin-role.dto';
import { Nullable } from '@moonlightjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

@Expose()
export class AdminUserDto {
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly id: string;
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly username: string;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly email: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly firstName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly middleName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly lastName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly displayName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly lastLogin: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly createdAt: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly updatedAt: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly roleId: string;
  @ApiProperty({ type: AdminRoleDto, required: true, isArray: true })
  @Expose()
  @Type(() => AdminRoleDto)
  public readonly roles?: AdminRoleDto[];
}
