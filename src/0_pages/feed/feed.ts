import { Component, inject, OnInit, signal } from '@angular/core';
import { Posts } from '../../services/posts';
import { humanTime } from '../profile/profile-utils';

@Component({
	selector: 'app-feed',
	imports: [],
	templateUrl: './feed.html',
	styleUrl: './feed.scss',
	standalone: true,
})
export class Feed implements OnInit {
  postService = inject(Posts);
  posts = signal<Post[] | null>(null);

  humanTime = humanTime;

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
