import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registry',
	templateUrl: './registry.html',
	standalone: true,
	styles: `
		:host {
			display: block;
		}
	`
})
export class RegistryComponent implements OnInit {
	public users = signal<User[]>([]);

	constructor(private userService: UserService, private router: Router) {}

	ngOnInit() {
		this.userService.getRegistry().subscribe((users: User[]) => {
			this.users.set(users);
		});
	}

	goToProfile(username: string) {
		this.router.navigate(['/profile'], { queryParams: { user: username } });
	}
}
