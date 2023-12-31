import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { SingupDto } from './dto/Signup.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './dto/Login.dto';
import { VerificationService } from './Verification';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/mail/email.services';

@Injectable()
export class AuthServices {
  constructor(
    private prisma: PrismaService,
    private email: EmailService,
    private status: VerificationService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: SingupDto): Promise<{ message: string }> {
    try {
      const verificationToken = uuidv4();
      const hash = await bcrypt.hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          id: dto.id,
          email: dto.email,
          password: hash,
          username: dto.username,
        },
      });
      await this.email.sendVerificationEmail(dto.email, user.id);

      return {
        message: 'Verification link sent to mail',
      };
    } catch (e) {
      return e.message;
    }
  }
  async verification(id: number) {
    const UnverifiedUser = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!UnverifiedUser) {
      throw new NotFoundException('No Such User Found');
    }
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        Verified: true,
      },
    });
    return {
      message: 'Email Verified Successfully',
    };
  }
  async login(dto: LoginDto) {
    try {
      const student = await this.prisma.user.findUnique({
        where: {
          username: dto.username,
        },
      });
      if (!student) {
        throw new ForbiddenException('Credentials Incorrect');
      }
      const match = await bcrypt.compare(dto.password, student.password);
      if (!match) {
        new ForbiddenException('Credentials Incorrect');
      }
      const status = await this.status.verification(student.id);
      if (status) {
        return { token: await this.signToken(student.username, student.id) };
      }
      return {
        message: 'Email not verified',
      };
    } catch (e) {
      return e.message;
    }
  }
  signToken(username: string, id: number) {
    const payload = {
      id,
      username,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
