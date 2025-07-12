import { Component, signal, effect } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService, User } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule],
})
export class ProfileComponent {
	posts = signal<any[]>([]);
	newPostContent = '';
	submitting = false;

	constructor(
		public authService: AuthService,
		private userService: UserService
	) {
		effect(() => {
			const user = this.authService.user();
			const userId = user?.id;

			if (userId !== null && userId !== undefined) {
				this.userService.getUserPosts(userId).subscribe({
					next: (posts: any[]) => {
						this.posts.set(posts);
					},
					error: (err: any) => {
						console.error('Error fetching user posts:', err);
					},
				});
			}
		});
	}

	submitPost() {
		const user = this.authService.user();
		const userId = user?.id;
		const content = this.newPostContent.trim();
		if (!userId || !content) return;
		this.submitting = true;

		this.userService.createPost(userId, content).subscribe({
			next: (result: any) => {
				this.userService.getUserPosts(userId).subscribe({
					next: (posts: any[]) => {
						this.posts.set(posts);
						this.newPostContent = '';
						this.submitting = false;
					},
					error: () => {
						this.submitting = false;
					},
				});
			},
			error: () => {
				this.submitting = false;
			},
		});
	}

	logout() {
		this.authService.logout();
	}
}
