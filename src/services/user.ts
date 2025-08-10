import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	getPeople(): Observable<User[]> {
		return this.http.get<User[]>('/registry');
	}

	register(username: string, password: string): Observable<any> {
		return this.http.post('/register', { username, password });
	}

	login(username: string, password: string) {
		return this.http.post('/login', {
			username,
			password,
		}) as Observable<LoginResponse>;
	}

	loginAuto() {
		return this.http.post('/login-auto', null) as Observable<LoginResponse>;
	}

	logout() {
		return this.http.post('/logout', null);
	}
}
