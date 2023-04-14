import { Match } from '@moonlightjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Expose()
export class ChangeAdminPasswordInput {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  public readonly currentPassword: string;
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  @Expose()
  public readonly newPassword: string;
  @ApiProperty({ required: true, type: String })
  @Match(ChangeAdminPasswordInput, 'newPassword')
  @IsNotEmpty()
  @IsString()
  @Expose()
  public readonly newPasswordConfirm: string;
}
