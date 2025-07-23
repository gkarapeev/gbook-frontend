import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
	const baseUrl = environment.apiUrl;

	// Only add base URL if the request doesn't already have a full URL
	if (!req.url.startsWith('http')) {
		const apiReq = req.clone({
			url: `${baseUrl}${req.url}`,
		});
		return next(apiReq);
	}

	return next(req);
};
