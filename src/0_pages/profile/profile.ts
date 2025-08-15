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

	profileUser$ = this.route.paramMap.pipe(
		switchMap((params) => {
			const userId = parseInt(params.get('userId') || '');
			if (isNaN(userId)) {
				const user = this.authService.user()!;
				history.replaceState({}, '', '/user/' + user.id);

				return of(user);
			}

			return this.userService
				.getPeople()
				.pipe(
					map((users) => users.find((u) => u.id === userId) ?? null)
				);
		})
	);
}
