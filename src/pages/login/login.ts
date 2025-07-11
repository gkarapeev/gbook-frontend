import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-login',
	imports: [RouterLink],
	templateUrl: './login.html',
	styleUrl: './login.scss',
	standalone: true,
})
export class Login {
	constructor(private authService: AuthService) {}

	login(username: string, password: string) {
		if (password === '123') {
			this.authService.login();
		}
	}
}
