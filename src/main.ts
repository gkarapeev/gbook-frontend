import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { App } from './pages/root/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


// Next do do:

// Store JWT and keep us loged-in after refresh