import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import { EmailService } from './email.services';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthServices, EmailService],
})
export class AuthModule {}
