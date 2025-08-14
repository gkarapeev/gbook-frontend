import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class Posts {
	constructor(private http: HttpClient) {}

	getFeed(skip: number, take: number) {
		return this.http.get(`/feed?skip=${skip}&take=${take}`) as Observable<Post[]>;
	}

	getUserPosts(userId: number, skip: number, take: number) {
		return this.http.get(`/posts?userId=${userId}&skip=${skip}&take=${take}`) as Observable<Post[]>;
	}

	createPost(
		authorId: number,
		hostId: number,
		content: string
	) {
		return this.http.post('/createPost', { authorId, hostId, content }) as Observable<Post>;
	}

	addComment(
		postId: number,
		authorId: number,
		content: string
	) {
		return this.http.post('/addComment', { postId, authorId, content }) as Observable<Comment>;
	}
}
