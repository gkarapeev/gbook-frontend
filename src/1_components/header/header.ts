import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationEnd, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AvatarUploadComponent } from '../image-upload/image-upload';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
	selector: 'app-header',
	imports: [RouterLink, MatButtonModule, MatMenuModule, MatIconModule],
	templateUrl: './header.html',
	styleUrl: './header.scss',
	standalone: true,
})
export class Header {
	authService = inject(AuthService);
	queryParam = signal(0);
	router = inject(Router);

	private dialog = inject(MatDialog);

	currentRoute = toSignal(
		this.router.events.pipe(
			filter((e) => e instanceof NavigationEnd),
			map(() => this.router.url)
		),
		{ initialValue: this.router.url }
	);

	openImageUpload() {
		this.dialog
			.open(AvatarUploadComponent, {
				panelClass: 'avatar-dialog',
				autoFocus: false,
				restoreFocus: false,
				hasBackdrop: true,
			})
			.afterClosed()
			.subscribe((result) => {
				if (result === 'success') {
					window.location.reload();
				}
			});
	}

	logout() {
		this.authService.logout();
	}
}

