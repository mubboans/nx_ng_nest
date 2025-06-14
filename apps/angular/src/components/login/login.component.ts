import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/store-actions';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpHelperService } from '../../services/http-method-helper.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { IUser } from '../../interfaces/user';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  API_URL,
  CONSTANT_VARIABLE,
  OTP_TYPE,
} from '../../contants/api_contants';
import { CommonModule } from '@angular/common';
import { ToastMessagingService } from '../../services/toast-messaging.service';

@Component({
  selector: 'app-login',
  imports: [
    NzButtonModule,
    NzSegmentedModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    NzModalModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent {
  @ViewChild('userForm') userForm!: NgForm;
  isLoading = false;
  public router = inject(Router);
  public httpService = inject(HttpHelperService);
  public toastMessagingService = inject(ToastMessagingService);
  public isVisibleMiddle = false;
  public user: IUser = {};
  public isModalBtnDisabled = true;

  constructor(private store: Store) {}

  public submit(): void {
    this.isLoading = true;
      this.httpService
        .fnApiPost(API_URL.auth.checkuser, { email: this.user.email })
        .subscribe((res) => {
          if (res?.success === CONSTANT_VARIABLE.SUCCESS_API_RESPONSE) {
            if (res.data.isUserExists) {
              this.sendEmailOtp();
              this.store.dispatch(
                setUser({
                  id: res?.data?.id,
                  username: res?.data?.userName,
                  email: res?.data?.email || this.user.email,
                  role: res?.data?.role,
                  contact: res?.data?.contact,
                })
              );
            } else {
              this.toastMessagingService.info('It seems you are a new user, please enter detail first.');
              this.isVisibleMiddle = true;
              this.isLoading = false;
            }
          }
      },
      (error) => {
        this.toastMessagingService.error(error?.error?.message);
        this.isLoading = false;
      }
    );
  }

  public handleCancelMiddle(): void {
    this.hideModal();
    this.userForm.resetForm();
  }

  public handleOkMiddle(): void {
    this.toastMessagingService.loading('Adding Data, Please Wait...');
    this.httpService
      .fnApiPost(API_URL.auth.userDetails, this.user)
      .subscribe((res) => {
        if (res.success) {

          this.toastMessagingService.success('Data added successfully!');
          this.sendEmailOtp();
          this.store.dispatch(
            setUser({
              id: res?.data?.id,
              username: res?.data?.userName,
              email: res?.data?.email,
              role: res?.data?.role,
              contact: res?.data?.contact,
            })
          );
        } else {
          this.toastMessagingService.error(res?.error?.errors[0]?.message || 'Error while adding data!');
          this.hideModal();
        }
      });
  }

  public hideModal(): void {
    this.isVisibleMiddle = false;
  }

  private sendEmailOtp(): void {
    this.httpService
      .fnApiPost(API_URL.auth.sendOtp, {
        email: this.user.email,
        otp_type: OTP_TYPE.authentication,
      })
      .subscribe((data) => {
        console.log(data, 'data');
        if (data?.success === CONSTANT_VARIABLE.SUCCESS_API_RESPONSE) {
          this.toastMessagingService.success(data?.message);
          this.router.navigate(['/otp']);
        } else {
          this.toastMessagingService.error(data?.message);
        }
        this.hideModal();
        this.isLoading = false;
      });
  }

  checkFormValidity(): void {
    if (this.userForm) {
      const isValid =
        this.user.username?.trim() &&
        this.user.contact?.match(/^[6-9][0-9]{9}$/) &&
        this.user.gender;
      this.isModalBtnDisabled = !isValid;
    }
  }
}
