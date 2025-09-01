import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class Posts {
	constructor(private http: HttpClient) {}

	getFeed(skip: number, take: number) {
		return this.http.get(`/feed?skip=${skip}&take=${take}`) as Observable<
			Post[]
		>;
	}

	getUserPosts(userId: number, skip: number, take: number) {
		return this.http.get(
			`/posts?userId=${userId}&skip=${skip}&take=${take}`
		) as Observable<Post[]>;
	}

	createPost(authorId: number, hostId: number, content: string, image?: File) {
		const formData = new FormData();

		if (image) {
			formData.append('image', image);
		}

		formData.append('userId', authorId.toString());
		formData.append('hostId', hostId.toString());
		formData.append('content', content);

		return this.http.post('/createPost', formData) as Observable<Post>;
	}

	addComment(postId: number, authorId: number, content: string) {
		return this.http.post('/addComment', {
			postId,
			authorId,
			content,
		}) as Observable<Comment>;
	}

	likePost(postId: number, unlike: boolean) {
		return this.http.post('/likePost', { postId, unlike });
	}
}
