import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagingService {
  constructor(private message: NzMessageService) {}

  success(message: string): void {
    this.message.success(message, { nzDuration: 3000 });
  }

  error(message: string): void {
    this.message.error(message, { nzDuration: 3000 });
  }

  warning(message: string): void {
    this.message.warning(message, { nzDuration: 3000 });
  }

  info(message: string): void {
    this.message.info(message, { nzDuration: 3000 });
  }

  loading(message: string): void {
    this.message.loading(message, { nzDuration: 3000 });
  }
}
