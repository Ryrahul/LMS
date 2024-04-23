import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPassDto {
  @IsNotEmpty()
  username: string;

 
}
