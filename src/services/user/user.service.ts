import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, take } from 'rxjs';

export interface User {
	id: number;
	username: string;
}

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>('/users').pipe(take(1));
	}

	register(username: string, password: string): Observable<any> {
		return this.http.post('/register', { username, password }).pipe(take(1));
	}

	login(username: string, password: string): Observable<any> {
		return this.http.post('/login', { username, password }).pipe(take(1));
	}
}
