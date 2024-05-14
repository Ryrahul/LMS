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
import { Public } from 'src/common/public.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthServices) {}
  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })
  @ApiBody({ type: SingupDto })
  signup(@Body() dto: SingupDto) {
    return this.authservice.signUp(dto);
  }
  @Public()
  @Get('verify/:id')
  @ApiOperation({ summary: 'Verify User' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'number' })
  @ApiParam({
    name: 'token',
    description: 'Verification Token',
    type: 'string',
  })
  verification(
    @Param('token') token: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(token);

    return this.authservice.verification(id);
  }
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.authservice.login(dto);
  }
}
