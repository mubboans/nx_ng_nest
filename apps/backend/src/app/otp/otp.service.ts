import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import * as nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { ConfigService } from '@nestjs/config';
import { text } from 'stream/consumers';

@Injectable()
export class OtpService {
  private mailGenerator: Mailgen;
  private transporter: nodemailer.Transporter;

  constructor(
  //   @InjectRepository(User)
  // private userRepository: Repository<User>,
    private configService: ConfigService) {
    this.mailGenerator = new Mailgen({
      theme: 'default', // Choose a theme (e.g., 'default', 'cerberus', 'salted')
      product: {
        name: this.configService.get<string>('MAILGEN_PRODUCT_NAME') || 'Mubashir',
        link: this.configService.get<string>('MAILGEN_PRODUCT_LINK') || 'https://maentriprisse.com',
        // Optional:
        // logo: 'https://example.com/logo.png',
        // copyright: 'Copyright © 2025 Your App Name'
      },
    });

    // this.transporter = nodemailer.createTransport({

    // });
    console.log(this.configService.get<string>('MAIL_HOST'),"this.configService.get<string>('MAIL_HOST')");
  }

  emailTransport(){
    const transport = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD')
      }
    })
    return transport
  }

  async sendVerificationCode(obj) {
    console.log('enter in send code');

    const transport = this.emailTransport();
    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: obj?.to,
      subject: obj?.subject,
      html: this.getEmailTemplate(this.generateCode(), obj?.to),
    }
    try {
     await transport.sendMail(options);
     console.log('Email sent successfully');
    } catch (error) {
      console.log('Error sending email:', error);

    }
  }


  checkUser(email: string): boolean {

    return true;
  }

  verifyCode(email: string, code: string): boolean {
    // Verify the code against the database
    // For demonstration, let's assume the code is valid
    return true;
  }

  public getEmailTemplate(code, email) {
    const emailTemplate = (otp: string) => ({
      body: {
        greeting: `Hello,`,
        intro: [
          'Thank you for attempting to log in to Our Awesome App!',
          'To complete your login, please click the button below to verify:',
          'Your One-Time Password (OTP) is:',
        ],
        action: {
          instructions: 'Please click the button below:',
          button: {
            color: '#22BC66',
            text: otp, // Use the 'otp' argument here
            link: `#otp-${otp}`, // A placeholder link (not typically used for OTP)
            // fallback: `Your OTP: ${otp}`, // Fallback text if button isn't rendered
          },
        },
        outro: [
          'This OTP is valid for a short period. Please do not share it with anyone.',
          'If you did not request this login attempt, you can safely ignore this email.',
          'If you have any questions, please contact our support team.',
          'Thanks,',
          'The Our Awesome App Team',
        ],
      },
    });


    return this.mailGenerator.generate(emailTemplate(code));
  }

  public generateCode() {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code;
  }
}
