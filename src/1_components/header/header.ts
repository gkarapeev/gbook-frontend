import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AvatarUploadComponent } from '../image-upload/image-upload';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-header',
	imports: [
		RouterLink,
		MatButtonModule,
		MatMenuModule,
		MatIconModule,
	],
	templateUrl: './header.html',
	styleUrl: './header.scss',
	standalone: true,
})
export class Header {
	authService = inject(AuthService);
	queryParam = signal(0);
	router = inject(Router);

	private dialog = inject(MatDialog);

	get isFeedActive(): boolean {
		return this.router.url.startsWith('/feed');
	}

	get isPeopleActive(): boolean {
		return this.router.url.startsWith('/people');
	}

	openImageUpload() {
		this.dialog.open(AvatarUploadComponent, {
			panelClass: 'avatar-dialog',
			autoFocus: false,
			restoreFocus: false,
			hasBackdrop: true,
		});
	}

	logout() {
		this.authService.logout();
	}
}

