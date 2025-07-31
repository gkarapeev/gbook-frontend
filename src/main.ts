import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { App } from './1_pages/root/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
  