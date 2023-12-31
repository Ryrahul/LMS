import { Module } from '@nestjs/common';
import { EmailService } from './email.services';

@Module({
  exports: [EmailService],
  providers: [EmailService],
})
export class EmailModule {}
