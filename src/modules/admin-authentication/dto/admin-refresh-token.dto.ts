import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class AdminRefreshTokenDto {
  @ApiProperty({ type: String, required: true })
  @Expose()
  public readonly accessToken: string;
  @ApiProperty({ type: String, required: true })
  @Expose()
  public readonly refreshToken: string;
}
