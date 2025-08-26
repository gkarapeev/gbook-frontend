import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PostList } from '../../1_components/post-list/post-list';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user';

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
				.getUser(hostId)
				.pipe(
					map((user) => user ?? null)
				);
		})
	);
}
