import { Effect } from '@modules/admin-authorization/policy/types/policy';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

@Expose()
export class PolicyPrincipalInput {
  @ApiProperty({ required: true, type: String, isArray: true })
  @IsString({
    each: true,
  })
  @IsArray()
  @Expose()
  public readonly Service?: string[] | null;
}

@Expose()
export class PolicyStatementInput {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly Sid?: string;
  @ApiProperty({ required: true, type: String, enum: Effect })
  @IsEnum(Effect)
  @Expose()
  public readonly Effect: Effect;
  @ApiProperty({ required: true, type: String, isArray: true })
  @IsString({
    each: true,
  })
  @IsArray()
  @IsOptional()
  @Expose()
  public readonly Action?: string[] | null;
  @ApiProperty({ required: true, type: String, isArray: true })
  @IsString({
    each: true,
  })
  @IsArray()
  @IsOptional()
  @Expose()
  public readonly NotAction?: string[] | null;
  @ApiProperty({ required: true, type: String, isArray: true })
  @IsString({
    each: true,
  })
  @IsArray()
  @IsOptional()
  @Expose()
  public readonly Resource?: string[] | null;
  @ApiProperty({ required: true, type: String, isArray: true })
  @IsString({
    each: true,
  })
  @IsArray()
  @IsOptional()
  @Expose()
  public readonly NotResource?: string[] | null;
  @ApiProperty({ required: true, type: () => PolicyPrincipalInput })
  @ValidateNested()
  @Type(() => PolicyPrincipalInput)
  @Expose()
  public readonly Principal?: PolicyPrincipalInput | null;
  @ApiProperty({ required: true, type: () => PolicyPrincipalInput })
  @ValidateNested()
  @Type(() => PolicyPrincipalInput)
  @IsOptional()
  @Expose()
  public readonly NotPrincipal?: PolicyPrincipalInput | null;
  @ApiProperty({ required: true, type: Object })
  @IsJSON()
  @IsOptional()
  @Expose()
  public readonly Condition?: unknown;
}

@Expose()
export class CreateAdminPolicyInput {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly name: string;
  @ApiProperty({ required: true })
  @IsString()
  @Expose()
  public readonly version: string;
  @ApiProperty({
    required: true,
    type: () => PolicyStatementInput,
    isArray: true,
  })
  @ValidateNested({
    each: true,
  })
  @IsArray()
  @Type(() => PolicyStatementInput)
  @Expose()
  public readonly statements: PolicyStatementInput[];
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly description: string;
}
