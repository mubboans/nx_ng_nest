import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';
import { ICategory } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  MOCK_CATEGORIES: ICategory[] = [
    {
      id: 'cat-001',
      name: 'Electronics',
      description: 'All electronic devices and gadgets',
      slug: 'electronics',
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-06-20'),
      isActive: true,
      status: 'published'
    },
    {
      id: 'cat-002',
      name: 'Clothing',
      description: 'Men, women and children clothing',
      slug: 'clothing',
      createdAt: new Date('2023-02-10'),
      updatedAt: new Date('2023-05-15'),
      isActive: true,
      status: 'published'
    },
    {
      id: 'cat-003',
      name: 'Home & Kitchen',
      description: 'Home appliances and kitchenware',
      slug: 'home-kitchen',
      createdAt: new Date('2023-03-05'),
      updatedAt: new Date('2023-04-18'),
      isActive: true,
      status: 'published'
    },
    {
      id: 'cat-004',
      name: 'Books',
      description: 'Fiction and non-fiction books',
      slug: 'books',
      createdAt: new Date('2023-01-22'),
      updatedAt: new Date('2023-07-30'),
      isActive: true,
      status: 'published'
    },
    {
      id: 'cat-005',
      name: 'Sports & Outdoors',
      description: 'Sports equipment and outdoor gear',
      slug: 'sports-outdoors',
      createdAt: new Date('2023-04-12'),
      updatedAt: new Date('2023-08-25'),
      isActive: true,
      status: 'published'
    },
    {
      id: 'cat-006',
      name: 'Toys & Games',
      description: 'Toys for children of all ages',
      slug: 'toys-games',
      createdAt: new Date('2023-05-08'),
      updatedAt: new Date('2023-09-10'),
      isActive: true,
      status: 'published'
    },
    {
      id: 'cat-007',
      name: 'Beauty & Personal Care',
      description: 'Cosmetics and personal hygiene products',
      slug: 'beauty-personal-care',
      createdAt: new Date('2023-06-14'),
      updatedAt: new Date('2023-10-05'),
      isActive: true,
      status: 'published'
    },
    {
      id: 'cat-008',
      name: 'Furniture',
      description: 'Home and office furniture',
      slug: 'furniture',
      createdAt: new Date('2023-07-19'),
      updatedAt: new Date('2023-11-15'),
      isActive: true,
      status: 'published'
    },
    {
      id: 'cat-009',
      name: 'Pet Supplies',
      description: 'Products for your pets',
      slug: 'pet-supplies',
      createdAt: new Date('2023-08-22'),
      updatedAt: new Date('2023-12-01'),
      isActive: true,
      deletedAt: null,
      status: 'archived'
    },
    {
      id: 'cat-010',
      name: 'Automotive',
      description: 'Car parts and accessories',
      slug: 'automotive',
      createdAt: new Date('2023-09-30'),
      updatedAt: new Date('2024-01-10'),
      isActive: false,
      deletedAt: new Date('2024-01-15'),
      status: 'deleted'
    }
  ];
  constructor(private http: HttpClient) { }

  fnGetCategory(object: any) {
    // return this.http.post('https://api.example.com/getCategory', object).pipe(map((data)=> data),catchError(throwError))
    return of(this.MOCK_CATEGORIES);
  }
}
