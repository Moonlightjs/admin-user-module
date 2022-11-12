import { ApiProperty } from '@nestjs/swagger';
import { Match } from '@moonlightjs/common';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Expose()
export class ChangeAdminPasswordInput {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly currentPassword: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Expose()
  public readonly newPassword: string;
  @ApiProperty({ required: true })
  @Match(ChangeAdminPasswordInput, 'newPassword')
  @IsNotEmpty()
  @IsString()
  @Expose()
  public readonly newPasswordConfirm: string;
}
