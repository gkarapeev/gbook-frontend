import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-people',
	templateUrl: './people.html',
	standalone: true,
	styleUrl: './people.scss',
	imports: [MatDivider, MatButton],
})
export class People implements OnInit {
	public users = signal<User[]>([]);
	public authService = inject(AuthService);

	private userService = inject(UserService);
	private router = inject(Router);

	ngOnInit() {
		this.userService.getPeople().subscribe((users: User[]) => {
			this.users.set(users);
		});
	}

	goToProfile(userId: number) {
		this.router.navigate(['/user', userId]);
	}

	requestFriendship(e: any, receiverId: number) {
		e.stopPropagation();
		this.userService.sendFriendRequest(receiverId).subscribe(() => {
			const updatedUsers = this.users().map((user) => {
				if (user.id === receiverId) {
					return {
						...user,
						friendshipStatus: 'pending',
						sentByUserId: this.authService.user()!.id,
					} as User;
				}

				return user;
			});

			this.users.set(updatedUsers);
		});
	}

	acceptFriendRequest(e: any, senderId: number) {
		e.stopPropagation();
		this.userService.acceptFriendRequest(senderId).subscribe(() => {
			const updatedUsers = this.users().map((user) => {
				if (user.id === senderId) {
					return {
						...user,
						friendshipStatus: 'accepted',
					} as User;
				}

				return user;
			});

			this.users.set(updatedUsers);
		});
	}

	cancelFriendRequest(e: any, otherUserId: number) {
		e.stopPropagation();

		this.userService.cancelFriendRequest(otherUserId).subscribe(() => {
			const updatedUsers = this.users().map((user) => {
				if (user.id === otherUserId) {
					const updatedUser = { ...user } as User;
					delete updatedUser.friendshipStatus;
					delete updatedUser.sentByUserId;
					return updatedUser;
				}

				return user;
			});

			this.users.set(updatedUsers);
		});
	}
}

