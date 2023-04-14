import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class AdminRefreshTokenInput {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @Expose()
  refreshToken: string;
}
