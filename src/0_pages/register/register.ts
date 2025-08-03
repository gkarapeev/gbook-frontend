import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-register',
	imports: [RouterLink, FormsModule, MatInputModule, MatButtonModule],
	templateUrl: './register.html',
	styleUrl: './register.scss',
	standalone: true,
})
export class Register {
	private authService = inject(AuthService);

	public entry = {
		username: '',
		password: '',
		confirmPassword: '',
	};

	register() {
		if (this.entry.password !== this.entry.confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		if (
			this.entry.password.length === 0 ||
			this.entry.username.length === 0
		) {
			alert('Username and password cannot be empty!');
			return;
		}

		this.authService.register(
			this.entry.username,
			this.entry.password
		);
	}
}
