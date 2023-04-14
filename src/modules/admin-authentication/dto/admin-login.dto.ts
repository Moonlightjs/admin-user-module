import { AdminUserProfileDto } from '@modules/admin-user';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class AdminLoginDto {
  @ApiProperty({ type: String, required: true })
  @Expose()
  public readonly accessToken: string;
  @ApiProperty({ type: String, required: true })
  @Expose()
  public readonly refreshToken: string;
  @ApiProperty({ type: AdminUserProfileDto, required: true })
  @Expose()
  public readonly user: AdminUserProfileDto;
}
