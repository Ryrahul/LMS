import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import { EmailService } from './email.services';
import { VerificationService } from './Verification';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthServices, EmailService,VerificationService],
})
export class AuthModule {}
