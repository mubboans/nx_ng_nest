import { HttpException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { ConfigService } from '@nestjs/config';
import { DatabaseHelpers } from '../../common/database-helper/db-helpers';
import { OTP } from './entities/otp.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class OtpService {
  private mailGenerator: Mailgen;


  constructor(
    // @InjectModel(OTP)
    // private readonly OtpModel: typeof OTP,
    private dbHelperService: DatabaseHelpers,
    private configService: ConfigService) {
    this.mailGenerator = new Mailgen({
      theme: 'default', // Choose a theme (e.g., 'default', 'cerberus', 'salted')
      product: {
        name: this.configService.get<string>('MAILGEN_PRODUCT_NAME') || 'Mubashir',
        link: this.configService.get<string>('MAILGEN_PRODUCT_LINK') || 'https://maentriprisse.com',
      },
    });

    // this.transporter = nodemailer.createTransport({

    // });
    console.log(this.configService.get<string>('MAIL_HOST'), "this.configService.get<string>('MAIL_HOST')");
  }

  emailTransport() {
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
    const transport = this.emailTransport();
    const options: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: obj?.to,
      subject: obj?.subject,
      html: this.getEmailTemplate(this.generateCode(), obj?.to),
    }
    try {
      const otp = this.generateCode();
      const otpCheck = await this.dbHelperService.fnGet(OTP, { email: obj?.to, otp_type: obj?.otp_type });
      if (otpCheck.length > 0) {
        // if (!otpRecord) {
        //   throw new Error('Failed to update OTP');
        // }
        const updateOj = {
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          isVerified: false,
          otp: otp,
        }
        if (new Date(otpCheck[0]?.lastAttempt) > new Date()) {
          throw new HttpException('You have already requested an OTP, please wait for a while', 400);
        }
        if (otpCheck[0]?.attemptCount > 3) {
          updateOj['attemptCount'] = 0;
        }
        await this.dbHelperService.fnUpdate(OTP, updateOj, { email: obj?.to, otp_type: obj?.otp_type });
      }

      await this.dbHelperService.fnPost(OTP, { email: obj?.to, otp: otp, otp_type: obj?.otp_type, expiresAt: new Date(Date.now() + 10 * 60 * 1000) });
      await transport.sendMail(options);
      console.log('Email sent successfully:', otpCheck, 'also check the otp data');
      return {
        success: true,
        message: 'Email sent successfully',
        data: {
          email: obj?.to,
          otp: otp,
        },
      };
    } catch (error) {
      console.log('Error sending email:', error);
      throw new HttpException('Failed to send email', 500);
    }
  }

  async checkUser(email: string) {
    try {
      const user = await this.dbHelperService.fnGet(User, { email });
      console.log(user, 'user');
      return user.length > 0;
    } catch (error) {
      console.log('Error checking user:', error);
      throw new HttpException('Failed to check user', 500);
    }
  }

  async verifyCode(email: string, code: string) {
    // Verify the code against the database
    // For demonstration, let's assume the code is valid
    // In a real application, you would check the code against the database
    // and possibly check if it has expired
    // const user = await this.userRepository.findOne({ where: { email } });
    // if (!user) {
    //   throw new Error('User not found');
    // }
    // if (user.otp !== code) {
    //   throw new Error('Invalid OTP');
    // }
    // if (user.otpExpiresAt < new Date()) {
    //   throw new Error('OTP expired');
    // }
    // Mark the OTP as used or delete it from the database
    // await this.userRepository.update({ otp: null, otpExpiresAt: null }, { where: { email } });
    // return true;
    // For demonstration, let's assume the code is valid
    // In a real application, you would check the code against the database
    return true;
  }

  public getEmailTemplate(code: string, email: string) {
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

  public generateCode(): string {
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
  }
}
