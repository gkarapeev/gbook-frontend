import { Component, OnInit, signal, computed, effect } from '@angular/core';
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
	constructor(
		public authService: AuthService,
		private userService: UserService
	) {
		effect(() => {
			const user = this.authService.user();			
			const userId = user?.id;

			if (userId !== null && userId !== undefined) {
				this.userService.getUserPosts(userId).subscribe({
					next: (posts) => {
						console.log('User posts fetched:', posts);
					},
					error: (err) => {
						console.error('Error fetching user posts:', err);
					},
				});
			}
		});
	}

	logout() {
		this.authService.logout();
	}
}
