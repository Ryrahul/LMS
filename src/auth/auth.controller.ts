import { Body, Controller, Post } from '@nestjs/common';
import { AuthServices } from './auth.services';
import { SingupDto } from './dto/Signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthServices) {}
  @Post('signup')
  signup(@Body() dto: SingupDto) {
    return this.authservice.signUp(dto);
  }
}
