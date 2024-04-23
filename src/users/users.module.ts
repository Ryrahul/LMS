import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.services';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
