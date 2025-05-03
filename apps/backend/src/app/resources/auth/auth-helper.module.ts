import { Module } from '@nestjs/common';
import { HttpHelperService } from './auth-helper.service';
import { AuthHelperController } from './auth-helper.controller';
import { CommonModule } from '../../common/share-module/common.module';

@Module({
  imports: [CommonModule ],
  controllers: [AuthHelperController],
  providers: [HttpHelperService],
})
export class AuthHelperModule {}
