import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-login',
	imports: [RouterLink, FormsModule],
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
