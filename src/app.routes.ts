import { Routes } from '@angular/router';
import { Login } from './1_pages/login/login';
import { Register } from './1_pages/register/register';
import { ProfileComponent } from './1_pages/profile/profile';
import { RegistryComponent } from './1_pages/registry/registry';
import { authGuard } from './services/auth/auth.guard';
import { loggedOutGuard } from './services/auth/logged-out.guard';

export const routes: Routes = [
	{ path: 'login', component: Login, canActivate: [loggedOutGuard] },
	{ path: 'register', component: Register, canActivate: [loggedOutGuard] },
	{ path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
	{ path: 'registry', component: RegistryComponent, canActivate: [authGuard] },
	{ path: '', redirectTo: '/profile', pathMatch: 'full' },
];
