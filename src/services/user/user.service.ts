import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

export interface User {
	name: string;
}

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>('/users');
	}
}
