import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loggedIn = signal(false);

	login() {
		this.loggedIn.set(true);
	}

	logout() {
		this.loggedIn.set(false);
	}

	isLoggedIn() {
		return this.loggedIn();
	}
}
