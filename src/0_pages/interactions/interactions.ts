import { Component, inject } from '@angular/core';
import { PostList } from '../../1_components/post-list/post-list';
import { ScrollTopService } from '../../services/scroll-top';

@Component({
	selector: 'app-interactions',
	imports: [],
	templateUrl: './interactions.html',
	styleUrl: './interactions.scss',
	standalone: true,
})
export class Interactions {
	public scrollToTop = inject(ScrollTopService).scrollToTop;
}
