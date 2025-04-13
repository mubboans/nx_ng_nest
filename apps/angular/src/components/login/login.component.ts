import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/store-actions';

@Component({
  selector: 'app-login',
  imports: [NzButtonModule, NzSegmentedModule, NzInputModule, NzIconModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent {
  constructor(private store: Store) {}
  isLoading = false;
  public router = inject(Router);
  submit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading= false;
      console.log('Login successful', this.isLoading);
      this.router.navigate(['/otp']);
      this.store.dispatch(setUser({name:'Mubashir',email:'tpsmubashir@gmail.com',token: Math.ceil(Math.random() * 100).toString()}))
    }, 5000);
  }
}
