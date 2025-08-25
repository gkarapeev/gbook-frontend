import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostList } from '../../1_components/post-list/post-list';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
	standalone: true,
	imports: [PostList, AsyncPipe],
})
export class Profile {
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
				.getPeople()
				.pipe(
					map((users) => users.find((u) => u.id === hostId) ?? null)
				);
		})
	);
}
