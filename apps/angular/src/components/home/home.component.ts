import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

import { TestDriveFlowComponent } from '../test-drive-flow/test-drive-flow.component';
import { selectUser } from '../../store/store-selectors';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzDrawerModule,
    NzToolTipModule,
    NzQRCodeModule,
    TestDriveFlowComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // User state
  currentUser: IUser | null = null;
  isLoggedIn = false;

  // Mobile menu drawer
  isMobileMenuOpen = false;

  // Modals and Drawers
  isTestDriveModalVisible = false;
  isQrModalVisible = false;
  isMediaModalVisible = false;
  isArticleDrawerVisible = false;
  initialTestDriveStep: 1 | 2 | 3 | 4 = 1;

  // Scannable QR Code URL
  get qrCodeScanUrl(): string {
    if (typeof window !== 'undefined' && window.location) {
      return `${window.location.origin}/test-drive`;
    }
    return 'https://mdxmotors.com/test-drive';
  }

  // Audio / Sound teaser state
  isPlayingAudio = false;
  private audioContext: any;
  private oscillator: any;

  // Active colorway customization for hero car
  activeColorway: 'white' | 'cyber' | 'mint' = 'white';

  get modalWidth(): string {
    return typeof window !== 'undefined' && window.innerWidth < 640 ? '94%' : '680px';
  }

  get qrModalWidth(): string {
    return typeof window !== 'undefined' && window.innerWidth < 640 ? '92%' : '420px';
  }

  get mediaModalWidth(): string {
    return typeof window !== 'undefined' && window.innerWidth < 640 ? '94%' : '640px';
  }

  get articleDrawerWidth(): string {
    return typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' : '520px';
  }

  ngOnInit(): void {
    // Set Dynamic SEO Metadata
    this.titleService.setTitle('MDX MOTORS | Next-Gen Hyper Electric Cars & AI Dynamics');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Discover MDX MOTORS APEX VELOCITY GT. 1,420 HP dual-motor electric hypercar engineered with AI telemetry, sub-2.0s 0-100 km/h, and Neo-Brutalist architectural precision. Book your VIP test drive.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'hypercar, electric vehicle, AI car, MDX motors, APEX velocity, test drive, fast EV, automotive innovation, Neo-Brutalism',
    });
    this.metaService.updateTag({ property: 'og:title', content: 'MDX MOTORS | Next-Gen Hyper Electric Cars & AI Dynamics' });
    this.metaService.updateTag({
      property: 'og:description',
      content: '1,420 HP dual-motor electric hypercar with AI telemetry. Book your VIP track test drive now.',
    });
    this.metaService.updateTag({ property: 'og:image', content: '/images/hypercar-hero.jpg' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });

    this.store.select(selectUser).subscribe((user) => {
      this.currentUser = user;
      this.isLoggedIn = !!user?.authToken || !!user?.email;
    });
  }


  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  openTestDriveModal(step: 1 | 2 | 3 | 4 = 1): void {
    this.initialTestDriveStep = step;
    this.isTestDriveModalVisible = true;
    this.closeMobileMenu();
  }

  closeTestDriveModal(): void {
    this.isTestDriveModalVisible = false;
  }

  openQrModal(): void {
    this.isQrModalVisible = true;
    this.closeMobileMenu();
  }

  closeQrModal(): void {
    this.isQrModalVisible = false;
  }

  openMediaPreview(): void {
    this.isMediaModalVisible = true;
    this.toggleEngineSound();
  }

  closeMediaModal(): void {
    this.isMediaModalVisible = false;
    this.stopEngineSound();
  }

  openArticleDrawer(): void {
    this.isArticleDrawerVisible = true;
    this.closeMobileMenu();
  }

  closeArticleDrawer(): void {
    this.isArticleDrawerVisible = false;
  }

  // Interactive Web Audio API Engine Rev Synthesizer
  toggleEngineSound(): void {
    try {
      if (this.isPlayingAudio) {
        this.stopEngineSound();
        return;
      }

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.audioContext = new AudioCtx();
      this.oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      this.oscillator.type = 'sawtooth';
      this.oscillator.frequency.setValueAtTime(65, this.audioContext.currentTime);
      this.oscillator.frequency.exponentialRampToValueAtTime(320, this.audioContext.currentTime + 1.2);
      this.oscillator.frequency.exponentialRampToValueAtTime(140, this.audioContext.currentTime + 2.5);

      gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 3.0);

      this.oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      this.oscillator.start();
      this.isPlayingAudio = true;

      setTimeout(() => {
        this.isPlayingAudio = false;
      }, 3000);
    } catch {
      this.isPlayingAudio = false;
    }
  }

  stopEngineSound(): void {
    if (this.oscillator) {
      try {
        this.oscillator.stop();
      } catch {}
      this.oscillator = null;
    }
    this.isPlayingAudio = false;
  }

  setColorway(color: 'white' | 'cyber' | 'mint'): void {
    this.activeColorway = color;
  }

  navigateToAdmin(): void {
    this.router.navigate(['/dashboard']);
  }
}
