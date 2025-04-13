/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzInputOtpComponent } from 'ng-zorro-antd/input';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/store-selectors';
import { updateToken } from '../../store/store-actions';
import { CategoryComponent } from "../category/category.component";

@Component({
  selector: 'app-otp',
  imports: [CommonModule, NzFlexDirective, NzTypographyComponent, NzInputOtpComponent, FormsModule, NzButtonModule, NzAlertModule, CategoryComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
  title = 'OTP Verification';
  subtitle = 'Enter the verification code we sent to your device';
  emailOrPhone: string = '';
  otpLength: number = 6;
  expiryTime: number = 60; // in seconds
  otpValue: string = '';
  isVerifying = false;
  showError = false;
  errorMessage = 'Invalid verification code. Please try again.';
  resendDisabled = false;
  resendCountdown = 0;
  private resendTimer: any;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.startResendTimer();
    this.getStoreData();
  }
  getStoreData() {
    this.store.select(selectUser).subscribe((state) => {
      // Assuming the store has a user object with email or phone

      console.log(state,' Check state');
      if (state) {
        this.emailOrPhone = state?.email || state?.name || '';
        this.emailOrPhone = this.maskEmailOrPhone(this.emailOrPhone);
      }
    });
  }

  onOtpChange(value: string): void {
    if (value.length === this.otpLength) {
      // Auto-submit if all digits are filled
      setTimeout(() => {
        this.verifyOtp();
      }, 300);
    }
  }

  isOtpValid(): boolean {
    return this.otpValue.length === this.otpLength;
  }

  verifyOtp(): void {
    if (this.isOtpValid()) {
      this.isVerifying = true;
      this.showError = false;

      // Emit the verification event with the OTP value
      // this.verify.emit(this.otpValue);

      // This would be replaced with actual verification logic in a real app
      // For demo purposes, we simulate a network request
      setTimeout(() => {
        this.isVerifying = false;

        // In a real application, this would come from your API response
        // For demonstration, we're mocking a failed verification
        this.showError = true;
        this.store.dispatch(updateToken({token: Math.ceil(Math.random() * 100).toString()}));
      }, 1500);
    }
  }

  resendCode(): void {
    if (!this.resendDisabled) {
      // this.resend.emit();
      this.otpValue = '';
      this.showError = false;
      this.startResendTimer();
    }
  }

  startResendTimer(): void {
    this.resendDisabled = true;
    this.resendCountdown = this.expiryTime;

    if (this.resendTimer) {
      clearInterval(this.resendTimer);
    }

    this.resendTimer = setInterval(() => {
      this.resendCountdown--;

      if (this.resendCountdown <= 0) {
        this.resendDisabled = false;
        clearInterval(this.resendTimer);
      }
    }, 1000);
  }

  maskEmailOrPhone(value: string): string {
    if (!value) return '';

    // Email masking
    if (value.includes('@')) {
      const [username, domain] = value.split('@');
      const maskedUsername = username.length > 2 ?
        username.substring(0, 2) + '*'.repeat(username.length - 2) :
        username;
      return `${maskedUsername}@${domain}`;
    }
    // Phone masking
    else {
      const showDigits = 4;
      return value.length > showDigits ?
        '*'.repeat(value.length - showDigits) + value.substring(value.length - showDigits) :
        value;
    }
  }

  ngOnDestroy(): void {
    if (this.resendTimer) {
      clearInterval(this.resendTimer);
    }
  }
}
