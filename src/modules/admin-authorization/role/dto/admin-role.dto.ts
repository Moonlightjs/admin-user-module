import { AdminPermissionDto } from '@modules/admin-authorization/permission/dto/admin-permission.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AdminRoleDto {
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly id: string;
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly name: string;
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly code: string;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly description: string | null;
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

  @ApiProperty({
    type: () => AdminPermissionDto,
    required: true,
    isArray: true,
  })
  @Expose()
  @Type(() => AdminPermissionDto)
  public readonly permissions: AdminPermissionDto[];
}
