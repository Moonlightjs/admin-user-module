import { AdminRoleDto } from '@modules/admin-authorization/role/dto';
import { AdminUserDto } from '@modules/admin-user/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Effect } from '../types';

export class PolicyPrincipalDto {
  @ApiProperty({ required: true, type: String, isArray: true })
  @Expose()
  public readonly Service?: string[] | null;
}

@Expose()
export class PolicyStatementDto {
  @ApiProperty({ type: 'string', nullable: true })
  @Expose()
  public readonly Sid: string | null;
  @ApiProperty({ type: 'string', required: true, enum: Effect })
  @Expose()
  public readonly Effect: Effect;
  @ApiProperty({
    type: 'string',
    nullable: true,
    isArray: true,
  })
  @Expose()
  public readonly Action?: string[] | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
    isArray: true,
  })
  @Expose()
  public readonly NotAction?: string[] | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
    isArray: true,
  })
  @Expose()
  public readonly Resource?: string[] | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
    isArray: true,
  })
  @Expose()
  public readonly NotResource?: string[] | null;
  @ApiProperty({
    type: () => PolicyPrincipalDto,
    nullable: true,
  })
  @Type(() => PolicyPrincipalDto)
  @Expose()
  public readonly Principal?: PolicyPrincipalDto | null;
  @ApiProperty({
    type: () => PolicyPrincipalDto,
    nullable: true,
  })
  @Type(() => PolicyPrincipalDto)
  @Expose()
  public readonly NotPrincipal?: PolicyPrincipalDto | null;
  @ApiProperty({ type: Object, nullable: true })
  @Expose()
  public readonly Condition?: unknown;
}

@Expose()
export class AdminPolicyDto {
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly id: string;
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly name: string;
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly version: string;
  @ApiProperty({
    type: () => PolicyStatementDto,
    required: true,
  })
  @Type(() => PolicyStatementDto)
  @Expose()
  public readonly statements: PolicyStatementDto[];
  @ApiProperty({ type: 'boolean', required: true })
  @Expose()
  public readonly isSystem: boolean;
  @ApiProperty({ type: 'string', required: false, nullable: true })
  @Expose()
  public readonly description: string;

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

  @ApiProperty({ type: () => AdminUserDto, required: true, isArray: true })
  @Expose()
  @Type(() => AdminUserDto)
  public readonly users: AdminUserDto[];
}
