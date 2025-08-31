import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user';
import { SESSION_EXPIRES } from '../../interceptors/cookie.interceptor';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public user = signal<User | null>(null);

	constructor(private router: Router, private userService: UserService) {}

	login(username: string, password: string) {
		this.userService.login(username, password).subscribe({
			next: (res: LoginResponse) => {
				this.user.set(res.user);
				localStorage.setItem(SESSION_EXPIRES, res.expires.toString())
				this.router.navigate(['/feed']);
			},
			error: (error: any) => {
				console.error('Login failed:', error);

				const errorMessage =
					error.error?.message || 'Login failed. Please try again.';
				alert(errorMessage);
			},
		});
	}

	logout() {
		this.userService.logout().subscribe({
			next: () => {
				this.user.set(null);
				localStorage.removeItem(SESSION_EXPIRES);
				this.router.navigate(['/login']);
			},
			error: () => {
				console.error('Error logging out.')
			}
		});
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
