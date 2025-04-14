import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/store-actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NzButtonModule, NzSegmentedModule, NzInputModule, NzIconModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent {
  isLoading = false;
  showError = false;
  public email:string | undefined;
  public router = inject(Router);

  constructor(private store: Store) {}

  public submit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading= false;
      console.log('Login successful', this.isLoading);
      this.router.navigate(['/otp']);
      this.store.dispatch(setUser({name:'Mubashir',email:'tpsmubashir@gmail.com'}))
    }, 5000);
  }
}
