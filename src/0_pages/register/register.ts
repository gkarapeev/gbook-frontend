import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-register',
	imports: [RouterLink, FormsModule],
	templateUrl: './register.html',
	styleUrl: './register.scss',
	standalone: true,
})
export class Register {
	constructor(private authService: AuthService) {}

	register(username: string, password: string, confirmPassword: string) {
		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		if (password.length === 0 || username.length === 0) {
			alert('Username and password cannot be empty!');
			return;
		}

		this.authService.register(username, password);
	}
}
