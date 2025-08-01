import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-header',
	imports: [RouterLink, MatButtonModule, MatMenuModule, MatIconModule],
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
