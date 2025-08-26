import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private http = inject(HttpClient)

	getPeople(): Observable<User[]> {
		return this.http.get<User[]>('/registry');
	}

	getUser(userId: User['id']): Observable<User> {
		return this.http.get<User>(`/users/${userId}`);
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

	uploadImage(file: File, userId: User['id']): Observable<any> {
		const formData = new FormData();
		formData.append('image', file);
		formData.append('userId', userId.toString());
		return this.http.post('/upload-image', formData);
	}
}
