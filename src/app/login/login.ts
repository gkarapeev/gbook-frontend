import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	imports: [FormsModule],
	templateUrl: './login.html',
	styleUrl: './login.scss',
	standalone: true,
})
export class Login {
	username = '';
	password = '';

	constructor(private router: Router, private authService: AuthService) {}

	login() {
		if (this.password === '123') {
			this.authService.login();
			this.router.navigate(['/profile']);
		}
	}
}
