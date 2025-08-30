import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ScrollTopService {
	public scrollToTop = new EventEmitter<void>();
}
