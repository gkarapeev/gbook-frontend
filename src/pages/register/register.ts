import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-register',
	imports: [],
	templateUrl: './register.html',
	styleUrl: './register.scss',
	standalone: true,
})
export class Register {
	constructor(private authService: AuthService) {}

	register(username: string, password: string, confirmPassword: string) {
		if (password === confirmPassword && password.length > 0) {
			// In a real app, you'd make an API call here
			// For now, we'll just redirect to login after successful registration
			alert('Registration successful! Please login.');
			// You could also automatically log them in here if desired
			// this.authService.login();
		} else {
			alert('Passwords do not match or are empty!');
		}
	}
}
