import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';

import { routes } from './app.routes';
import { cookieInterceptor } from './interceptors/cookie.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([baseUrlInterceptor, cookieInterceptor])),
  ]
};
