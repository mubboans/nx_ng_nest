import { Module } from '@nestjs/common';
import { HttpHelperService } from './auth-helper.service';
import { AuthHelperController } from './auth-helper.controller';

@Module({
  controllers: [AuthHelperController],
  providers: [HttpHelperService],
})
export class AuthHelperModule {}
