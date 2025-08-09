import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class Posts {
	constructor(private http: HttpClient) {}

	getFeed() {
		return this.http.get(`/feed`) as Observable<Post[]>;
	}

	getUserPosts(userId: number) {
		return this.http.get(`/posts?userId=${userId}`) as Observable<Post[]>;
	}

	createPost(
		authorId: number,
		hostId: number,
		content: string
	): Observable<any> {
		return this.http.post('/createPost', { authorId, hostId, content });
	}

	addComment(
		postId: number,
		authorId: number,
		content: string
	) {
		return this.http.post('/addComment', { postId, authorId, content }) as Observable<Comment>;
	}
}
