import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ProfileComponent } from './pages/profile/profile';
import { authGuard } from './services/auth/auth.guard';
import { loginGuard } from './services/auth/login.guard';

export const routes: Routes = [
	{ path: 'login', component: Login, canActivate: [loginGuard] },
	{ path: 'register', component: Register },
	{ path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
	{ path: '', redirectTo: '/profile', pathMatch: 'full' },
];
