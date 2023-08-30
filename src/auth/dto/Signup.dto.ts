import { IsEmail, IsNotEmpty } from 'class-validator';

export class SingupDto {
    id:number
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;
  
  role: string;

  @IsNotEmpty()
  password: string;
}
