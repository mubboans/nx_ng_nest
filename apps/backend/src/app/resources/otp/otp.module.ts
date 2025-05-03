import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../../common/share-module/common.module';

@Module({
  imports: [ConfigModule,CommonModule],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
