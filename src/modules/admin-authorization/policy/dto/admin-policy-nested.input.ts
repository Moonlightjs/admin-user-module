import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';

export class AdminPolicyId {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class AdminPolicyCreateNesteds {
  @ApiProperty({ required: false, isArray: true, type: AdminPolicyId })
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => AdminPolicyId)
  connect?: AdminPolicyId[];
}

export class AdminPolicyUpdateNesteds {
  @ApiProperty({
    required: false,
    isArray: true,
    type: () => AdminPolicyId,
  })
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => AdminPolicyId)
  set?: AdminPolicyId[];
}
