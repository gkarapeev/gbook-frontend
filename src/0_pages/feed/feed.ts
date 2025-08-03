import { Component, inject, OnInit, signal } from '@angular/core';
import { Posts } from '../../services/posts';
import { PostList } from '../../1_components/post-list/post-list';

@Component({
	selector: 'app-feed',
	imports: [PostList],
	templateUrl: './feed.html',
	styleUrl: './feed.scss',
	standalone: true,
})
export class Feed implements OnInit {
  postService = inject(Posts);
  posts = signal<Post[]>([]);

  ngOnInit(): void {
		this.postService.getFeed().subscribe({
			next: (posts: Post[]) => {
				this.posts.set(posts);
			},
			error: (err: any) => {
				console.error('Error fetching user posts:', err);
			},
		});
	}
}
