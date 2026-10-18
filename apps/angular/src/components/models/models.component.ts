import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TestDriveFlowComponent } from '../test-drive-flow/test-drive-flow.component';

interface CarModel {
  id: string;
  name: string;
  tagline: string;
  category: string;
  hp: string;
  acceleration: string;
  topSpeed: string;
  range: string;
  price: string;
  color: string;
  image: string;
}

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule, RouterModule, NzButtonModule, NzIconModule, NzModalModule, TestDriveFlowComponent],
  template: `
    <div class="min-h-screen bg-[#eaecf0] py-8 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto space-y-8">
        <!-- Header -->
        <header class="bg-[#fde8d7] border-3 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000] flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <a routerLink="/" class="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-lg border border-black hover:bg-[#ffc4c4] hover:text-black transition-colors">
              MX
            </a>
            <div>
              <span class="text-xs uppercase font-mono-tech font-bold text-slate-700">MDX MOTORS LINEUP</span>
              <h1 class="text-2xl sm:text-3xl font-black uppercase text-black m-0">Performance Fleet 2026</h1>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <a routerLink="/" class="px-4 py-2 bg-white text-black text-xs font-mono-tech font-bold uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-gray-100 transition-all flex items-center gap-1.5 text-decoration-none">
              <nz-icon nzType="arrow-left" /> Back to Home
            </a>
            <a routerLink="/dashboard" class="px-4 py-2 bg-black text-white text-xs font-mono-tech font-bold uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#cffafe] hover:text-black transition-all text-decoration-none">
              Admin CMS
            </a>
          </div>
        </header>

        <!-- Cars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (car of fleet; track car.id) {
            <div class="bg-white border-3 border-black rounded-3xl p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="px-3 py-1 bg-black text-white text-[10px] font-mono-tech uppercase font-bold rounded-lg">
                    {{ car.category }}
                  </span>
                  <span class="font-mono-tech font-bold text-sm text-black">
                    {{ car.price }}
                  </span>
                </div>

                <!-- Car Preview -->
                <div class="h-48 rounded-2xl border-2 border-black overflow-hidden bg-[#f0e6fc] p-3 flex items-center justify-center relative">
                  <img [src]="car.image" [alt]="car.name" class="w-full h-full object-contain" />
                </div>

                <div>
                  <h3 class="text-xl font-black uppercase text-black m-0">{{ car.name }}</h3>
                  <p class="text-xs font-mono-tech text-gray-600 mt-1">{{ car.tagline }}</p>
                </div>

                <!-- Specs Matrix -->
                <div class="grid grid-cols-2 gap-2 text-xs font-mono-tech">
                  <div class="p-2 bg-gray-50 border border-black rounded-lg">
                    <span class="text-gray-500 text-[10px] block">POWER</span>
                    <strong class="text-black">{{ car.hp }}</strong>
                  </div>
                  <div class="p-2 bg-gray-50 border border-black rounded-lg">
                    <span class="text-gray-500 text-[10px] block">0-100 KM/H</span>
                    <strong class="text-black">{{ car.acceleration }}</strong>
                  </div>
                  <div class="p-2 bg-gray-50 border border-black rounded-lg">
                    <span class="text-gray-500 text-[10px] block">TOP SPEED</span>
                    <strong class="text-black">{{ car.topSpeed }}</strong>
                  </div>
                  <div class="p-2 bg-gray-50 border border-black rounded-lg">
                    <span class="text-gray-500 text-[10px] block">RANGE</span>
                    <strong class="text-black">{{ car.range }}</strong>
                  </div>
                </div>
              </div>

              <!-- Action -->
              <div class="pt-6 border-t-2 border-black mt-6">
                <button
                  type="button"
                  (click)="openBooking(car)"
                  class="w-full py-3 bg-[#ffc4c4] text-black font-bold text-xs uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <nz-icon nzType="car" />
                  <span>Book Test Drive</span>
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Test Drive Modal -->
    <nz-modal
      [(nzVisible)]="isModalOpen"
      [nzFooter]="null"
      [nzClosable]="false"
      (nzOnCancel)="isModalOpen = false"
      [nzWidth]="680"
      nzWrapClassName="neo-modal"
      nzCentered
    >
      <ng-container *nzModalContent>
        <app-test-drive-flow
          [initialStep]="1"
          [isModalMode]="true"
          (close)="isModalOpen = false"
          (completed)="isModalOpen = false"
        ></app-test-drive-flow>
      </ng-container>
    </nz-modal>
  `,
})
export class ModelsComponent {
  isModalOpen = false;
  selectedCar: CarModel | null = null;

  fleet: CarModel[] = [
    {
      id: 'apex-gt',
      name: 'APEX VELOCITY GT',
      tagline: 'Flagship Hyper EV with AI Active Aerodynamics',
      category: 'Hypercar',
      hp: '1,420 HP',
      acceleration: '1.89s',
      topSpeed: '350 km/h',
      range: '680 km',
      price: '$285,000',
      color: '#d6e4ff',
      image: '/images/hypercar-hero.jpg',
    },
    {
      id: 'apex-chronos',
      name: 'APEX CHRONOS SUITE',
      tagline: 'High-Velocity Gran Turismo Coupé',
      category: 'Luxury GT',
      hp: '1,050 HP',
      acceleration: '2.4s',
      topSpeed: '320 km/h',
      range: '750 km',
      price: '$198,000',
      color: '#f0e6fc',
      image: '/images/hypercar-hero.jpg',
    },
    {
      id: 'apex-aether',
      name: 'APEX AETHER SPEEDSTER',
      tagline: 'Open-Cockpit Pure Carbon Track Instrument',
      category: 'Track Edition',
      hp: '1,600 HP',
      acceleration: '1.75s',
      topSpeed: '380 km/h',
      range: '520 km',
      price: '$340,000',
      color: '#d1fae5',
      image: '/images/hypercar-hero.jpg',
    },
  ];

  openBooking(car: CarModel): void {
    this.selectedCar = car;
    this.isModalOpen = true;
  }
}
