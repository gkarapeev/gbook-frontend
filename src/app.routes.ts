import { Routes } from '@angular/router';
import { Login } from './0_pages/login/login';
import { Register } from './0_pages/register/register';
import { Profile } from './0_pages/profile/profile';
import { People } from './0_pages/people/people';
import { authGuard } from './services/auth/auth.guard';
import { loggedOutGuard } from './services/auth/logged-out.guard';
import { Feed } from './0_pages/feed/feed';

export const routes: Routes = [
	{ path: 'login', component: Login, canActivate: [loggedOutGuard] },
	{ path: 'register', component: Register, canActivate: [loggedOutGuard] },
	{ path: 'user/:userId', component: Profile, canActivate: [authGuard] },
	{ path: 'feed', component: Feed, canActivate: [authGuard] },
	{ path: 'people', component: People, canActivate: [authGuard] },
	{ path: '', redirectTo: '/feed', pathMatch: 'full' },
];
