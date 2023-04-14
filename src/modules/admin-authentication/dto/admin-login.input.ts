import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class AdminLoginInput implements Readonly<AdminLoginInput> {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @Expose()
  username: string;

  @ApiProperty({ required: true, type: String })
  @IsString()
  @Expose()
  password: string;
}
