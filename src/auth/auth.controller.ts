import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthServices } from './auth.services';
import { SingupDto } from './dto/Signup.dto';
import { LoginDto } from './dto/Login.dto';
import { JwtAuthGuard } from './auth.guard';

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
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authservice.login(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('jwt')
  jwt(){
    return 'hi'
  }
}
