import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	getRegistry(): Observable<User[]> {
		return this.http.get<User[]>('/registry');
	}

	register(username: string, password: string): Observable<any> {
		return this.http.post('/register', { username, password });
	}

	login(username: string, password: string): Observable<any> {
		return this.http.post('/login', { username, password });
	}

	getUserPosts(userId: number): Observable<any> {
		return this.http.get(`/posts?userId=${userId}`, { withCredentials: true });
	}

	createPost(authorId: number, hostId: number, content: string): Observable<any> {
		return this.http.post('/createPost', { authorId, hostId, content });
	}
}
