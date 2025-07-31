import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-header',
	imports: [RouterLink],
	templateUrl: './header.html',
	styleUrl: './header.scss',
	standalone: true,
})
export class Header {
	authService = inject(AuthService);

	logout() {
		this.authService.logout();
	}
}
