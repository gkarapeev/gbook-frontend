import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loggedIn = signal(false);

	constructor(private router: Router) {}

	login() {
		this.loggedIn.set(true);
		this.router.navigate(['/profile']);
	}

	logout() {
		this.loggedIn.set(false);
		this.router.navigate(['/login']);
	}

	isLoggedIn() {
		return this.loggedIn();
	}
}
