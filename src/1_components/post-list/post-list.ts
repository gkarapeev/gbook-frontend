import { NgTemplateOutlet } from '@angular/common';
import {
	Component,
	effect,
	Input,
	input,
	signal
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Posts } from '../../services/posts';
import { humanTime } from '../utils/utils';

interface PostWithComments extends Post {
	commentsExpanded: boolean
}

@Component({
	selector: 'app-post-list',
	imports: [
		RouterLink,
		NgTemplateOutlet,
		MatInputModule,
		MatIconModule,
		MatButton
	],
	templateUrl: './post-list.html',
	styleUrl: './post-list.scss',
	standalone: true,
})
export class PostList {
	@Input({ required: true })
	public mode!: 'feed' | 'profile';

	public profileUser = input<User | null>(null);

	public posts = signal<PostWithComments[]>([]);
	public newPostContent = '';

	public humanTime = humanTime;
	public isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
		navigator.userAgent
	);

	constructor(
		public authService: AuthService,
		private postService: Posts,
	) {
		effect(() => {
			if (this.mode === 'profile') {
				const user = this.profileUser();
				if (user) {
					this.loadPosts(user.id);
				}

				return;
			}

			this.postService.getFeed().subscribe({
				next: (posts: Post[]) => {
					this.posts.set(posts.map(p => ({ ...p, commentsExpanded: false })));
				},
				error: (err: any) => {
					console.error('Error fetching user posts:', err);
				},
			});
		});
	}

	loadPosts(userId: number) {
		this.postService.getUserPosts(userId).subscribe({
			next: (posts: Post[]) => {
				this.posts.set(posts.map(p => ({ ...p, commentsExpanded: false })));
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

		this.postService
			.createPost(currentUser.id, pageUser.id, content)
			.subscribe({
				next: () => {
					this.postService.getUserPosts(pageUser.id).subscribe({
						next: (posts: any[]) => {
							this.posts.set(posts);
							this.newPostContent = '';
						},
						error: () => {},
					});
				},
				error: () => {},
			});
	}

	onNewPostKeydown(event: any) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
			event.preventDefault();
			this.submitPost();
		}
	}

	addComment(commentText: string, postId: number): void {
		this.postService
			.addComment(postId, this.authService.user()!.id, commentText)
			.subscribe({
				next: (c: Comment) => {
					this.posts.update((posts) => {
						const post = posts.find((p) => p.id === postId);
						if (!post) {
							return posts;
						}

						if (!post.comments) {
							post.comments = [];
						}

						post.comments.unshift(c);

						return [...posts];
					});
				},
			});
	}
}
