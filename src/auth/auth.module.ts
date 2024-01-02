import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import { VerificationService } from './Verification';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { EmailModule } from 'src/mail/email.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    EmailModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthServices, VerificationService, JwtStrategy],
})
export class AuthModule {}
