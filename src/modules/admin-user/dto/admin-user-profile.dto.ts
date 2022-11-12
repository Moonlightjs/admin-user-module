import { ApiProperty } from '@nestjs/swagger';
import { Nullable } from '@moonlightjs/common';
import { Expose } from 'class-transformer';
@Expose()
export class AdminUserProfileDto {
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly id: string;
  @ApiProperty({ type: 'string', required: true })
  @Expose()
  public readonly username: string;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly email: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly firstName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly middleName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly lastName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly displayName: Nullable<string>;
  @ApiProperty({ type: 'string', required: true, nullable: true })
  @Expose()
  public readonly lastLogin: Nullable<string>;
}
