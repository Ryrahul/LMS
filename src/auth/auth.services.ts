import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { SingupDto } from './dto/Signup.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from './email.services';

@Injectable()
export class AuthServices {
  constructor(
    private prisma: PrismaService,
    private email: EmailService,
  ) {}
  async signUp(dto: SingupDto) {
    try {
      const verificationToken = uuidv4();
      console.log(verificationToken);

      const hash = await bcrypt.hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          id: dto.id,
          email: dto.email,
          password: hash,
          username: dto.username,
          Unique_String: verificationToken,
        },
      });
      console.log(user);
      await this.email.sendVerificationEmail(
        dto.email,
        verificationToken,
        user.id.toString(),
      );

      return {
        message: 'Verification link sent to mail',
      };
    } catch (e) {
      return e.message;
    }
  }
  async verification(token: string, id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        Unique_String: token,
      },
    });

    console.log(user);

    if (!user) {
      throw new NotFoundException('Verification token not found.');
    }
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        Verified: true,
        Unique_String: null,
      },
    });
    return user;
  }
}
