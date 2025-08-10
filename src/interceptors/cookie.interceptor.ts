import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const SESSION_EXPIRES = 'sessionExp';

const oneDay = 24 * 60 * 60 * 1000;

const skippedRoutes = ['/login-auto', '/login'];

const shouldSkip = (url: string) => skippedRoutes.some(r => url.endsWith(r));

export const cookieInterceptor: HttpInterceptorFn = (req, next) => {
	const http = inject(HttpClient);
	const authService = inject(AuthService);
	const expires = localStorage.getItem(SESSION_EXPIRES);
	const now = Date.now();

	const shouldPass = !shouldSkip(req.url);

	if (shouldPass && expires !== null && parseInt(expires) - now < oneDay) {
		http.post<LoginResponse>('/login-auto', null, { withCredentials: true }).subscribe({
			next: (v: LoginResponse) => {
				localStorage.setItem(SESSION_EXPIRES, v.expires.toString());
			}
		});
	}

	const cloned = req.clone({ withCredentials: true });

	return next(cloned).pipe(
		catchError((err) => {
			if (err.status === 401) {
				authService.logout();
			}
			return throwError(() => err);
		})
	);
};
