import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { ICONS } from '../contants/icons';
import { provideStore } from '@ngrx/store';
import { storeReducer } from '../store/store-reducers';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([])),
    provideNzIcons(ICONS),
    provideStore({storedata: storeReducer}),
    provideNzI18n(en_US),
    { provide: LOCALE_ID, useValue: 'en' }
],
};
