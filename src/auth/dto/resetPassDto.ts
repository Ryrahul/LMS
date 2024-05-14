import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPassDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
