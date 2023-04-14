import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Expose()
export class CreateAdminPermissionInput {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  @Expose()
  public readonly action: string;
  @ApiProperty({ required: true, type: String })
  @IsString()
  @IsOptional()
  @Expose()
  public readonly subject?: string | null;
  @ApiProperty({ required: false, type: Object })
  @IsJSON()
  @IsOptional()
  @Expose()
  public readonly properties?:
    | Prisma.InputJsonValue
    | Prisma.NullableJsonNullValueInput;
  @ApiProperty({ required: false, type: Object })
  @IsJSON()
  @IsOptional()
  @Expose()
  public readonly conditions?:
    | Prisma.InputJsonValue
    | Prisma.NullableJsonNullValueInput;
}
