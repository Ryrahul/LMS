import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.services';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'Gmail',
        auth: {
          user: this.configService.get('user'),
          pass: this.configService.get('pass'),
        },
      }),
    );
  }

  async sendVerificationEmail(email: string, token: string,id:string) {
    const mailOptions = {
      from: this.configService.get('user'),
      to: email,
      subject: 'Email Verification',

      html: `
    <p>Click the following link to verify your email:</p>
    <a href="http://localhost:3001/auth/verify/${token}/${id}">Verify Email</a>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
