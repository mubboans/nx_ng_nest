import { Module } from '@nestjs/common';
import { AuthHelperService } from './auth-helper.service';
import { AuthHelperController } from './auth-helper.controller';

@Module({
  controllers: [AuthHelperController],
  providers: [AuthHelperService],
})
export class AuthHelperModule {}
