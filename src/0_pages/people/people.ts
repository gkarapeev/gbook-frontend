import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
	selector: 'app-people',
	templateUrl: './people.html',
	standalone: true,
	styles: `
		@use 'variables' as v;
		@use 'mixins' as m;

		@include m.post-type-indicator;

		:host {
			display: block;

			::ng-deep .mdc-list-item__primary-text {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
		}

		#people-list {
			padding: v.$size-2 0;
		}
	`,
	imports: [MatListModule, MatDividerModule],
})
export class People implements OnInit {
	public users = signal<User[]>([]);

	constructor(private userService: UserService, private router: Router) {}

	ngOnInit() {
		this.userService.getPeople().subscribe((users: User[]) => {
			this.users.set(users);
		});
	}

	goToProfile(username: string) {
		this.router.navigate(['/profile'], { queryParams: { user: username } });
	}
}
