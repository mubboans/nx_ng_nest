/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzInputOtpComponent } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/store-selectors';
import { updateUser } from '../../store/store-actions';
import { CategoryComponent } from "../category/category.component";
import { HttpHelperService } from '../../services/http-method-helper.service';
import { API_URL, OTP_TYPE } from '../../contants/api_contants';
import { IUser } from '../../interfaces/user';
import e from 'express';
import { Router } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-otp',
  imports: [CommonModule, NzFlexDirective, NzInputOtpComponent, FormsModule, NzButtonModule, NzAlertModule, CategoryComponent, DashboardComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
  title = 'Enter Code for Verification';
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
  public user:IUser = {};
  private resendTimer: any;
  private httpService = inject(HttpHelperService);

  constructor(
    private store: Store,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.startResendTimer();
    this.getStoreData();
  }
  getStoreData() {
    this.store.select(selectUser).subscribe((user) => {
      console.log('user from store', user);
      if (user) {
        this.emailOrPhone = user?.email || user?.username || '';
        this.emailOrPhone = this.maskEmailOrPhone(this.emailOrPhone);
        this.user = user;
      }
    });
  }

  onOtpChange(value: string): void {
    if (value.length === this.otpLength) {
      this.verifyOtp();
    }
  }

  isOtpValid(): boolean {
    return this.otpValue.length === this.otpLength;
  }

  verifyOtp(): void {
    if (this.isOtpValid()) {
      this.isVerifying = true;
      this.showError = false;
      this.httpService.fnApiPost(API_URL.auth.verifyOtp, { email: this.user.email, code: this.otpValue, otp_type: OTP_TYPE.authentication }).subscribe((res) => {
        if (res.success) {
          this.isVerifying = false;
          this.store.dispatch(updateUser({ authToken: res.data?.authToken }));
          this.router.navigate(['/dashboard']);
        }
        else {
          this.isVerifying = false;
          this.showError = true;
          this.errorMessage = res.message || 'Invalid verification code. Please try again.';
        }
      });
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
