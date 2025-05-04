import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/store-actions';
import { FormsModule } from '@angular/forms';
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
import { NzMessageService } from 'ng-zorro-antd/message';
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
  isLoading = false;
  public router = inject(Router);
  public httpService = inject(HttpHelperService);
  public isVisibleMiddle = false;
  public user: IUser = {};

  constructor(private store: Store, private message: NzMessageService) {}

  public submit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.httpService
        .fnApiPost(API_URL.auth.checkuser, { email: this.user.email })
        .subscribe((res) => {
          console.log(res, 'Check user response');

          if (res?.success === CONSTANT_VARIABLE.SUCCESS_API_RESPONSE) {
            if (res.data.isUserExists) {
              this.sendEmailOtp();
              this.store.dispatch(
                setUser({
                  id: res.data.id,
                  username: res.data.userName,
                  email: this.user.email,
                  role: res.data.role,
                  contact: res.data.contact,
                })
              );
            } else {
              this.message.info('It seems you are a new user, please enter detail first.', { nzDuration: 2500 }).onClose!.subscribe(() => {
                this.isVisibleMiddle = true;
              });
              // this.isVisibleMiddle = true;
            }
          }
          this.isLoading = false;
        });
    }, 1000);
  }

  public handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  public handleOkMiddle(): void {
    const loadingMsgID = this.message.loading('Adding Data, Please Wait...', {
      nzDuration: 1000,
    }).messageId;

    this.httpService
      .fnApiPost(API_URL.auth.userDetails, this.user)
      .subscribe((data) => {
        if (data.success) {
          this.isVisibleMiddle = false;
          this.message.remove(loadingMsgID);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.message
            .success('Data added successfully!', { nzDuration: 2500 })
            .onClose!.subscribe(() => {
              this.sendEmailOtp();
              this.router.navigate(['/otp']);
              this.hideModal();
            });
        } else {
          this.message.remove(loadingMsgID);
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.message
            .error('Error while adding data!', { nzDuration: 2500 })
            .onClose!.subscribe(() => {
              this.hideModal();
              this.isVisibleMiddle = false;
            });
        }
      });
    this.isVisibleMiddle = false;
  }

  public hideModal(): void {
    this.isVisibleMiddle = false;
  }

  private sendEmailOtp(): void {
    this.httpService
      .fnApiPost(API_URL.auth.sendOtp, {
        email: this.user.email,
        type: OTP_TYPE.authentication,
      })
      .subscribe((data) => {
        if (data.success === CONSTANT_VARIABLE.SUCCESS_API_RESPONSE) {
          this.message.success(data.message, { nzDuration: 2500 });
        } else {
          this.message.error(data.message, { nzDuration: 2500 });
        }
      });
  }

  get isModalBtnDisabled(): boolean {
    return this.user.email &&
      this.user.username &&
      this.user.contact &&
      this.user.gender
      ? false
      : true;
  }
}
