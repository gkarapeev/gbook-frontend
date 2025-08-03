import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-login',
	imports: [RouterLink, FormsModule, MatInputModule, MatButtonModule],
	templateUrl: './login.html',
	styleUrl: './login.scss',
	standalone: true,
})
export class Login {
	public credentials = {
		username: '',
		password: '',
	};

	constructor(private authService: AuthService) {}

	login() {
		this.authService.login(this.credentials.username, this.credentials.password);
	}
}
