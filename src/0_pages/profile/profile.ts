import { Component, signal, effect } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Posts } from '../../services/posts';
import { PostList } from '../../1_components/post-list/post-list';
import { TextArea } from '../../1_components/textarea/textarea';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		MatInputModule,
		MatIconModule,
		MatButton,
		PostList,
		TextArea
	],
})
export class Profile {
	profileUser = signal<User | null>(null);
	posts = signal<Post[]>([]);

	newPostContent = '';
	submitting = false;

	constructor(
		public authService: AuthService,
		private userService: UserService,
		private postService: Posts,
		private route: ActivatedRoute,
	) {
		effect(() => {
			this.route.queryParams.subscribe((params) => {
				const username = params['user'];

				if (username) {
					this.userService.getPeople().subscribe((users) => {
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
		this.postService.getUserPosts(userId).subscribe({
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

		this.postService
			.createPost(currentUser.id, pageUser.id, content)
			.subscribe({
				next: () => {
					this.postService.getUserPosts(pageUser.id).subscribe({
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

	onNewPostKeydown(event: any) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
			event.preventDefault();
			this.submitPost();
		}
	}

	addComment(e: CommentInfo) {
		this.postService.addComment(e.postId, this.authService.user()!.id, e.content).subscribe({
			next: (c: Comment) => {
				this.posts.update((posts) => {
					const post = posts.find((p) => p.id === e.postId);
					if (!post) {
						return posts;
					}

					if (!post.comments) {
						post.comments = [];
					}

					post.comments.unshift(c);
					
					return [...posts];
				});
			}
		});
	}
}
