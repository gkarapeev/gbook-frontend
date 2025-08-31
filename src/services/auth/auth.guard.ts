import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AutoLoginService } from './auto-login';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
	const startupService = inject(AutoLoginService);
	const router = inject(Router);
	const authService = inject(AuthService);

	return startupService.loaded.pipe(
		map(() => {
			if (authService.user() !== null) {
				return true;
			}
			
			return router.createUrlTree(['/login']);
		}),
		catchError(() => of(router.createUrlTree(['/login'])))
	);
};
