import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthHelperModule } from './auth/auth-helper.module';

@Module({
  imports: [AuthHelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
