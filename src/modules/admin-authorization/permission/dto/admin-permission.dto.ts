import { AdminRoleDto } from '@modules/admin-authorization/role/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AdminPermissionDto {
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly id: string;
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly action: string;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly subject: string | null;
  @ApiProperty({ type: 'object', required: true, nullable: true })
  @Expose()
  public readonly properties: unknown | null;
  @ApiProperty({ type: 'object', required: true, nullable: true })
  @Expose()
  public readonly conditions: unknown | null;
  @ApiProperty({ type: 'boolean', required: true })
  @Expose()
  public readonly isSystem: boolean;
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly createdAt: string;
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly updatedAt: string;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly createdById: string | null;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly updatedById: string | null;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly createdByUsername: string | null;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly updatedByUsername: string | null;

  @ApiProperty({ type: () => AdminRoleDto, required: true, isArray: true })
  @Expose()
  @Type(() => AdminRoleDto)
  public readonly roles: AdminRoleDto[];
}
