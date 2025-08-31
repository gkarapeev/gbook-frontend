import { inject, Injectable } from '@angular/core';
import { catchError, of, ReplaySubject } from 'rxjs';
import { UserService } from '../user';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class AutoLoginService {
	private userService = inject(UserService);
	private authService = inject(AuthService);

	public loaded = new ReplaySubject<true>(1);

	constructor() {
		this.userService
			.loginAuto()
			.pipe(catchError(() => of('auto_failed')))
			.subscribe({
				next: (res: string | LoginResponse) => {
					if (typeof res !== 'string' && res.user) {
						this.authService.user.set(res.user);
					}

					this.loaded.next(true);
				},
			});
	}
}

