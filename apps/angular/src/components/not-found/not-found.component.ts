import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, NzIconModule, NzButtonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }
}
