import { Component, signal, effect } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule, RouterLink],
})
export class ProfileComponent {
	profileUser = signal<User | null>(null);
	posts = signal<Post[]>([]);

	newPostContent = '';
	submitting = false;

	constructor(
		public authService: AuthService,
		private userService: UserService,
		private route: ActivatedRoute
	) {
		effect(() => {
			this.route.queryParams.subscribe((params) => {
				const username = params['user'];

				if (username) {
					this.userService.getRegistry().subscribe((users) => {
						const found = users.find(
							(u) => u.username === username
						);

						if (found) {
							this.profileUser.set(found);
							this.loadPosts(found.id);
						} else {
							this.profileUser.set(null);
						}
					});
				} else {
					const user = this.authService.user();
					if (!user) {
						return;
					}

					this.profileUser.set(user);

					this.loadPosts(user.id);
				}
			});
		});
	}

	loadPosts(userId: number) {
		this.userService.getUserPosts(userId).subscribe({
			next: (posts: any[]) => {
				this.posts.set(posts);
			},
			error: (err: any) => {
				console.error('Error fetching user posts:', err);
			},
		});
	}

	submitPost() {
		const currentUser = this.authService.user();
		const pageUser = this.profileUser();
		const content = this.newPostContent.trim();

		if (!currentUser || !pageUser || !content) {
			return;
		}

		this.submitting = true;

		this.userService
			.createPost(currentUser.id, pageUser.id, content)
			.subscribe({
				next: () => {
					this.userService.getUserPosts(pageUser.id).subscribe({
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
