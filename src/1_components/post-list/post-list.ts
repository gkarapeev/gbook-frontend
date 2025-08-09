import {
	Component,
	effect,
	EventEmitter,
	Input,
	input,
	Output,
	signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { humanTime } from '../utils/utils';
import { MatInputModule } from '@angular/material/input';
import { Posts } from '../../services/posts';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
	selector: 'app-post-list',
	imports: [
		RouterLink,
		NgTemplateOutlet,
		MatInputModule,
		MatIconModule,
		MatButton,
	],
	templateUrl: './post-list.html',
	styleUrl: './post-list.scss',
	standalone: true,
})
export class PostList {
	@Input({ required: true })
	public mode!: 'feed' | 'profile';

	@Output()
	public comment = new EventEmitter<CommentInfo>();

	public profileUser = input<User | null>(null);

	public posts = signal<Post[]>([]);
	public newPostContent = '';

	public humanTime = humanTime;
	public isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
		navigator.userAgent
	);

	constructor(
		public authService: AuthService,
		private userService: UserService,
		private postService: Posts,
		private route: ActivatedRoute
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
					this.posts.set(posts);
				},
				error: (err: any) => {
					console.error('Error fetching user posts:', err);
				},
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
