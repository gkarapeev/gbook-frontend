import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, output, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PostList } from '../../1_components/post-list/post-list';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user';
import { ScrollTopService } from '../../services/scroll-top';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
	standalone: true,
	imports: [PostList, AsyncPipe],
})
export class Profile implements AfterViewInit, OnDestroy{
	public scrollToTop = inject(ScrollTopService).scrollToTop;

	private authService = inject(AuthService);
	private userService = inject(UserService);
	private route = inject(ActivatedRoute);

	pageHost$ = this.route.paramMap.pipe(
		switchMap((params) => {
			const hostId = parseInt(params.get('userId') || '');
			const user = this.authService.user()!;

			if (hostId === user.id) {
				return of(user);
			}

			return this.userService
				.getUser(hostId)
				.pipe(
					map((user) => user ?? null)
				);
		})
	);

	public smallHeader = signal(false);
	private scrollListener: any;
	ngAfterViewInit() {
		const pageView = document.getElementById('page-view')!;

		this.scrollListener = pageView.addEventListener('scroll', () => {			
			if (pageView.scrollTop > 20) {
				this.smallHeader.set(true);
			} else if (pageView.scrollTop < 2) {
				this.smallHeader.set(false);
			}
		});
	}

	ngOnDestroy(): void {
		document.getElementById('page-view')!.removeEventListener('scroll', this.scrollListener);
	}
}
