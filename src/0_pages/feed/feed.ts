import { Component, inject } from '@angular/core';
import { PostList } from '../../1_components/post-list/post-list';
import { ScrollTopService } from '../../services/scroll-top';

@Component({
	selector: 'app-feed',
	imports: [PostList],
	templateUrl: './feed.html',
	styleUrl: './feed.scss',
	standalone: true,
})
export class Feed {
	public scrollToTop = inject(ScrollTopService).scrollToTop;
}
