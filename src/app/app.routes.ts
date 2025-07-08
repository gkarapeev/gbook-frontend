import { Routes } from '@angular/router';
import { Login } from './login/login';
import { ProfileComponent } from './profile/profile';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/profile', pathMatch: 'full' }
];
