import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
	standalone: true,
})
export class ProfileComponent {
	constructor(private authService: AuthService) {}

	logout() {
		this.authService.logout();
	}
}
