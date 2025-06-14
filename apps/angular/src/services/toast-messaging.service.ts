import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagingService {
  constructor(private message: NzMessageService) {}

  success(message: string): void {
    this.closeAll(); // Close any existing messages before showing a new one
    this.message.success(message, { nzDuration: 3000 });
  }

  error(message: string): void {
    this.closeAll(); // Close any existing messages before showing a new one
    this.message.error(message, { nzDuration: 3000 });
  }

  warning(message: string): void {
    this.closeAll(); // Close any existing messages before showing a new one
    this.message.warning(message, { nzDuration: 3000 });
  }

  info(message: string): void {
    this.closeAll(); // Close any existing messages before showing a new one
    this.message.info(message, { nzDuration: 3000 });
  }

  loading(message: string): void {
    this.closeAll(); // Close any existing messages before showing a new one
    this.message.loading(message, { nzDuration: 3000 });
  }
  closeAll(): void {
    this.message.remove();
  }
}
