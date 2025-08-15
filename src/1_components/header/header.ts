import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ImageUploadComponent } from '../image-upload/image-upload';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	imports: [
		RouterLink,
		MatButtonModule,
		MatMenuModule,
		MatIconModule,
		ImageUploadComponent,
	],
	templateUrl: './header.html',
	styleUrl: './header.scss',
	standalone: true,
})
export class Header {
	authService = inject(AuthService);
	queryParam = signal(0);
	router = inject(Router);

	get isFeedActive(): boolean {
		return this.router.url.startsWith('/feed');
	}

	get isPeopleActive(): boolean {
		return this.router.url.startsWith('/people');
	}

	logout() {
		this.authService.logout();
	}
}
