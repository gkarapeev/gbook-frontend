import { Routes } from '@angular/router';
import { Login } from './login/login';
import { ProfileComponent } from './profile/profile';
import { authGuard } from './auth.guard';
import { loginGuard } from './login.guard';

export const routes: Routes = [
	{ path: 'login', component: Login, canActivate: [loginGuard] },
	{ path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
	{ path: '', redirectTo: '/profile', pathMatch: 'full' },
];
