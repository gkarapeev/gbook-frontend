import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostList } from '../../1_components/post-list/post-list';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.html',
	styleUrls: ['./profile.scss'],
	standalone: true,
	imports: [PostList],
})
export class Profile {
	profileUser = signal<User | null>(null);

	constructor(
		public authService: AuthService,
		private userService: UserService,
		private route: ActivatedRoute
	) {
		effect(() => {
			this.route.queryParams.subscribe((params) => {
				const username = params['user'];

				if (username) {
					this.userService.getPeople().subscribe((users) => {
						const found = users.find(
							(u) => u.username === username
						);

						if (found) {
							this.profileUser.set(found);
						} else {
							this.profileUser.set(null);
						}
					});
				} else {
					const user = this.authService.user();
					if (!user) {
						return;
					}

					this.profileUser.set(user);
				}
			});
		});
	}
}
