import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from '../user.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	if (authService.user() !== null) {
		return true;
	}

	const userService = inject(UserService);

	return userService.loginAuto().pipe(
		map((user) => {
			if (user) {
				authService.user.set(user);
				return true;
			}

			return router.createUrlTree(['/login']);
		}),
		catchError(() => of(router.createUrlTree(['/login'])))
	);
};
