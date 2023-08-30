import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthServices } from './auth.services';
import { SingupDto } from './dto/Signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthServices) {}
  @Post('signup')
  signup(@Body() dto: SingupDto) {
    return this.authservice.signUp(dto);
  }
  @Get('verify/:token/:id')
  verification(
    @Param('token') token: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(token);

    return this.authservice.verification(token, id);
  }
}
