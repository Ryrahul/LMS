import { IsNotEmpty } from 'class-validator';

export class FindUserDto {
  @IsNotEmpty()
  username: string;
}
