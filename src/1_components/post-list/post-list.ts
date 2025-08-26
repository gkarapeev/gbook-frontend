import { NgTemplateOutlet } from '@angular/common';
import {
	AfterViewInit,
	Component,
	effect,
	Input,
	input,
	signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Posts } from '../../services/posts';
import { humanTime } from '../utils/utils';
import { LinkifyPipe } from '../../pipes/linkify';

interface PostWithComments extends Post {
	commentsExpanded: boolean;
}

@Component({
	selector: 'app-post-list',
	imports: [
		RouterLink,
		NgTemplateOutlet,
		MatInputModule,
		MatIconModule,
		MatButton,
		LinkifyPipe,
	],
	templateUrl: './post-list.html',
	styleUrl: './post-list.scss',
	standalone: true,
})
export class PostList {
	@Input({ required: true })
	public mode!: 'feed' | 'profile';

	public pageHost = input<User | null>(null);

	public posts = signal<PostWithComments[]>([]);

	public skip = 0;
	public take = 10;
	private loading = false;
	private allLoaded = false;

	public humanTime = humanTime;
	public isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
		navigator.userAgent
	);

	constructor(public authService: AuthService, private postService: Posts) {
		effect(() => {
			this.skip = 0;
			this.allLoaded = false;

			if (this.mode === 'profile') {
				const user = this.pageHost();
				if (!user) {
					return;
				}

				this.loadPosts(user.id, true);
				return;
			}

			this.loadFeed();
		});
	}

	ngAfterViewInit() {
		const pageView = document.getElementById('page-view');

		if (!pageView) {
			return;
		}

		pageView.removeEventListener('scroll', this.onScroll);
		pageView.addEventListener('scroll', this.onScroll);
	}

	ngOnDestroy() {
		const pageView = document.getElementById('page-view');

		if (pageView) {
			pageView.removeEventListener('scroll', this.onScroll);
		}
	}

	loadPosts(userId: number, reset = false) {
		if (this.loading || this.allLoaded) {
			return;
		}

		this.loading = true;
		const skip = reset ? 0 : this.skip;

		this.postService.getUserPosts(userId, skip, this.take).subscribe({
			next: (posts: Post[]) => {
				if (reset) {
					this.setPosts(posts);
				} else {
					this.appendPosts(posts);
				}

				if (posts.length < this.take) {
					this.allLoaded = true;
				}

				this.skip += posts.length;
				this.loading = false;
			},
			error: (err: any) => {
				console.error('Error fetching user posts:', err);
				this.loading = false;
			},
		});
	}

	loadFeed(reset = false) {
		if (this.loading || this.allLoaded) {
			return;
		}

		this.loading = true;
		const skip = reset ? 0 : this.skip;
		this.postService.getFeed(skip, this.take).subscribe({
			next: (posts: Post[]) => {
				if (reset) {
					this.setPosts(posts);
				} else {
					this.appendPosts(posts);
				}

				if (posts.length < this.take) {
					this.allLoaded = true;
				}

				this.skip += posts.length;
				this.loading = false;
			},
			error: (err: any) => {
				console.error('Error fetching feed posts:', err);
				this.loading = false;
			},
		});
	}

	onNewPostKeydown(event: any, textarea: HTMLTextAreaElement) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
			event.preventDefault();
			this.submitPost(textarea);
		}
	}

	submitPost(textarea: HTMLTextAreaElement) {
		const currentUser = this.authService.user();
		if (!currentUser) {
			return;
		}

		const hostId =
			this.pageHost() !== null ? this.pageHost()!.id : currentUser.id;

		const content = textarea.value.trim();
		if (!hostId || !content) {
			return;
		}

		this.postService.createPost(currentUser.id, hostId, content).subscribe({
			next: () => {
				this.skip = 0;
				this.allLoaded = false;

				if (this.mode === 'profile') {
					this.loadPosts(hostId, true);
				} else {
					this.loadFeed(true);
				}

				textarea.value = '';
			},
			error: () => {},
		});
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

						post.comments.push(c);

						return [...posts];
					});
				},
			});
	}

	private setPosts(posts: Post[]) {
		this.posts.set(posts.map((p) => ({ ...p, commentsExpanded: false })));
	}

	private appendPosts(posts: Post[]) {
		if (!posts.length) {
			return;
		}

		this.posts.update((prev) => [
			...prev,
			...posts.map((p) => ({ ...p, commentsExpanded: false })),
		]);
	}

	private onScroll = () => {
		const pageView = document.getElementById('page-view');
		if (!pageView || this.loading || this.allLoaded) {
			return;
		}

		const scrollBottom =
			pageView.scrollHeight - pageView.scrollTop - pageView.clientHeight;

		if (scrollBottom > 100) {
			return;
		}

		if (this.mode === 'profile') {
			const user = this.pageHost();
			if (user) {
				this.loadPosts(user.id);
			}

			return;
		}

		this.loadFeed();
	};
}
