import { Component } from '@angular/core';
import { CdkDragDrop, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
}

interface BoardColumn {
  name: string;
  tasks: Task[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    NzDropDownModule,
    NzButtonModule,
    NzMenuModule,
    NzIconModule
  ]
})
export class DashboardComponent {
  columns: BoardColumn[] = [
    { name: 'To Do', tasks: [] },
    { name: 'In Progress', tasks: [] },
    { name: 'Done', tasks: [] },
  ];

  allTasks: Task[] = [
    { id: 1, title: 'Task 1', status: 'To Do' },
    { id: 2, title: 'Task 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', status: 'Done' },
  ];

  get columnDropListIds(): string[] {
    return this.columns.map((_, i) => 'col' + i);
  }

  getConnectedDropListIds(currentIdx: number): string[] {
    return ['allTasksList', ...this.columnDropListIds.filter((_, i) => i !== currentIdx)];
  }

  drop(event: CdkDragDrop<any[]>, columnIndex: number) {
    if (event.previousContainer === event.container) {
      transferArrayItem(
        event.container.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
