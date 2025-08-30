import { Component, ElementRef, inject, Signal, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../1_components/header/header';
import { ScrollTopService } from '../../services/scroll-top';
import { H } from '@angular/cdk/keycodes';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, Header],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	private pageView: Signal<ElementRef<HTMLDivElement> | undefined> = viewChild('pageView');

	constructor() {
		inject(ScrollTopService).scrollToTop.subscribe(() => {
			this.pageView()!.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}
}
