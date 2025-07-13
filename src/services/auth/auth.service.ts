import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';


@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user = signal<User | null>(null);

	constructor(private router: Router, private userService: UserService) {}

	login(username: string, password: string) {
		this.userService.login(username, password).subscribe({
			next: (user: User) => {
				this.user.set(user);
				this.router.navigate(['/profile']);
			},
			error: (error: any) => {
				console.error('Login failed:', error);

				const errorMessage =
					error.error?.message ||
					'Login failed. Please try again.';
				alert(errorMessage);
			},
		});
	}

	logout() {
		this.user.set(null);
		this.router.navigate(['/login']);
	}

	register(username: string, password: string) {
		this.userService.register(username, password).subscribe({
			next: (response: any) => {
				alert('Registration successful! Please login.');
				this.router.navigate(['/login']);
			},
			error: (error: any) => {
				console.error('Registration failed:', error);
				const errorMessage =
					error.error?.message ||
					'Registration failed. Please try again.';
				alert(errorMessage);
			},
		});
	}
}
