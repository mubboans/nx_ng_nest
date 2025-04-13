import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ICategory } from './category';
import { CategoryService } from './category.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-category',
  imports: [CommonModule, NzTableModule, NzButtonModule, NzModalModule, NzCardModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  total = 1;
  cateogryList: ICategory[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterStatus = [
    { text: 'Active', value: 'active' },
    { text: 'Inactive', value: 'inactive' }
  ];
  showModal = false;
  deleteModalVisible = false;
  categoryObj: ICategory | null = null;
  isModalLoading = false;


  public category_service = inject(CategoryService);
  private modalService = inject(NzModalService);
  public loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.category_service.fnGetCategory({}).subscribe((data) => {
      this.loading = false;
      this.total = data.length;
      this.cateogryList = data;
    });
  }

  public onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }

  public editCategory(category: ICategory): void {
    console.log('Edit category:', category);
    this.showModal = true;
    this.categoryObj = category;
  }

  public deleteCategory(category: ICategory): void {
    console.log('Delete category:', category);
    this.modalService.confirm({
      nzTitle: `Are you sure delete ${category.name}?`,
      nzContent: '<b style="color: red;">This operation cant be reverted</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('Category deleted'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  public handleCancel(): void {
    this.showModal = false;
  }

  public addCategory(): void {
    console.log('Add category');
    this.categoryObj = null;
    this.showModal = true;
  }

  public submitModal(): void {
    console.log('Submit modal');
    this.isModalLoading = true;
    setTimeout(() => {
      this.categoryObj = null;
      this.isModalLoading = false;
      this.showModal = false;
    }, 2000);
  }
}
