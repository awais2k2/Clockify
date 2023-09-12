import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, text: string, from: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Your email service provider
      auth: {
        user: 'awaiskhanbadshah123@gmail.com', // Your email address
        pass: 'sgglmbhnelzkptbr', // Your email password or app password
      },
    });

    const mailOptions = {
      from: from,
      to,
      subject,
      text,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return 'Email sent successfully!';
    } catch (error) {
      console.error('Email sending error:', error);
      return 'Email sending failed.';
    }
  }
}
