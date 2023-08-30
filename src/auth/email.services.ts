import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { ConfigService } from '@nestjs/config'; 

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
      })
    );
  }

  async sendVerificationEmail(email: string, token: string,id:number) {
    
    const mailOptions = {
      from: this.configService.get('user'),
      to: email,
      subject: 'Email Verification',
      text: `Click the following link to verify your email: http://localhost:3001/auth/verify/${id}/${token}`,
    };

  
    await this.transporter.sendMail(mailOptions);
  }
}
