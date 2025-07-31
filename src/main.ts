import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { App } from './0_pages/0_root/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
  