import { Component } from '@angular/core';

@Component({
	selector: 'app-login',
	imports: [],
	template: `<h2>Login</h2>
		<form>
			<input type="text" placeholder="Username" />
			<input type="password" placeholder="Password" />
			<button type="submit">Login</button>
		</form>`,
	styleUrl: './login.scss',
	standalone: true,
})
export class Login {}
