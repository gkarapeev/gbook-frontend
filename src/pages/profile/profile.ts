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
export class ProfileComponent implements OnInit {
	isLoading = signal<boolean>(true);
	user = signal<User | null>(null);
	error = signal<string | null>(null);

	displayName = computed(() => {
		const userData = this.user();
		return userData?.name || 'Unknown User';
	});

	constructor(
		private authService: AuthService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.loadUserData();
	}

	async loadUserData(): Promise<void> {
		this.isLoading.set(true);
		this.error.set(null);

		this.userService.getUsers().subscribe({
			next: (users) => {
				const userData = users && users.length > 0 ? users[0] : null;
				if (userData) {
					this.user.set(userData);
				} else {
					throw new Error('No user data found');
				}
			},
			error: (err) => {
				const result =
					err instanceof Error
						? err.message
						: 'Failed to load user data';

						this.error.set(result);
						this.isLoading.set(false);
			},
			complete: () => {
				this.isLoading.set(false);
			},
		});
	}

	logout() {
		this.authService.logout();
	}
}
