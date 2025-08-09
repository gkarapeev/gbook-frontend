import { Component } from '@angular/core';
import { PostList } from '../../1_components/post-list/post-list';

@Component({
	selector: 'app-feed',
	imports: [PostList],
	templateUrl: './feed.html',
	styleUrl: './feed.scss',
	standalone: true,
})
export class Feed {}
