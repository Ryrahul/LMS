import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import { EmailService } from './email.services';
import { VerificationService } from './Verification';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
      global: true,
    })],
  controllers: [AuthController],
  providers: [AuthServices, EmailService,VerificationService],
})
export class AuthModule {}
