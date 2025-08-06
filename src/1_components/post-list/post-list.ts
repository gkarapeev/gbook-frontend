import {
	Component,
	EventEmitter,
	Input,
	input,
	Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { humanTime } from '../utils/utils';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-post-list',
	imports: [RouterLink, NgTemplateOutlet, MatInputModule],
	templateUrl: './post-list.html',
	styleUrl: './post-list.scss',
	standalone: true,
})
export class PostList {
	@Input({ required: true })
	mode!: 'feed' | 'profile';

	@Output() comment = new EventEmitter<CommentInfo>();

	posts = input<Post[]>();
	humanTime = humanTime;

	addComment(target: HTMLInputElement, postId: number): void {
		this.comment.next({
			postId,
			content: target.value,
		});
	}
}
