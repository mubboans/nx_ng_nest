import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { selectUser } from '../store/store-selectors';
@Component({
  imports: [RouterModule, NzIconModule, NzMenuModule, NzLayoutModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  title = 'angular';
  isCollapsed = false;
  showSidebar = false;
  ngOnInit(): void {
    this.store.select(selectUser).subscribe((state) => {
      console.log(!!state?.token, 'Check isLoggedIn state');
      this.showSidebar = !!state?.token ;
    });
  }
}
