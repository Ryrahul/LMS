import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { SingupDto } from './dto/Signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServices {
  constructor(private prisma: PrismaService) {}
  async signUp(dto: SingupDto) {
    try {
      const hash = await bcrypt.hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: {
           id:dto.id,         
          email: dto.email,
          password: hash,
          username: dto.username,
          
        },
      });
      return user;
    } catch (e) {
      return e.message;
    }
  }
}
