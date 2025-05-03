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
import { API_URL } from '../../contants/api_contants';
@Component({
  selector: 'app-login',
  imports: [NzButtonModule, NzSegmentedModule, NzInputModule, NzIconModule, FormsModule, NzModalModule, NzInputModule, NzFormModule, NzSelectModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent {
  isLoading = false;
  showError = false;
  public email = '';
  public router = inject(Router);
  public httpService = inject(HttpHelperService);
  public isVisibleMiddle = false;
  public user: IUser = {};

  constructor(private store: Store) {}

  public submit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading= false;
      this.httpService.fnApiPost(API_URL.auth.checkuser,{ email: this.email}).subscribe((data) => {
        if (!data.success) {
          this.showError = false;
        }
      })
      this.isVisibleMiddle = true;
      // this.router.navigate(['/otp']);
      this.store.dispatch(setUser({name:'Mubashir',email:this.email}))
    }, 5000);
  }

  public handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  public handleOkMiddle(): void {
    console.log('ok');
  }

  get isModalBtnDisabled(): boolean {
    return this.user.email && this.user.username && this.user.contact && this.user.gender ? false : true;
  }
}
