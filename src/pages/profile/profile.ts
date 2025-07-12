import { Component, OnInit, signal, computed } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService, User } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
	standalone: true,
	imports: [CommonModule],
})
export class ProfileComponent {
	isLoading = signal<boolean>(true);
	user = signal<User | null>(null);
	error = signal<string | null>(null);

	displayName = computed(() => {
		const userData = this.user();
		return userData?.username || 'Unknown User';
	});

	constructor(public authService: AuthService) {}

	logout() {
		this.authService.logout();
	}
}
