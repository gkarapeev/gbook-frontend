import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-login',
	imports: [RouterLink, FormsModule, MatInputModule, MatButtonModule, MatIconModule],
	templateUrl: './login.html',
	styleUrl: './login.scss',
	standalone: true,
})
export class Login {
	private authService = inject(AuthService);

	public entry = {
		username: '',
		password: '',
	};

	public showPassword = false;

	login() {
		this.authService.login(this.entry.username.trim(), this.entry.password);
	}
}
