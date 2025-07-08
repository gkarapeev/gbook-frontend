import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private loggedIn = signal(false);

	constructor(private router: Router, private userService: UserService) {}

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

	register(username: string, password: string) {
		this.userService.register(username, password).subscribe({
			next: (response: any) => {
				alert('Registration successful! Please login.');
				this.router.navigate(['/login']);
			},
			error: (error: any) => {
				console.error('Registration failed:', error);
				const errorMessage = error.error?.message || 'Registration failed. Please try again.';
				alert(errorMessage);
			}
		});
	}
}
