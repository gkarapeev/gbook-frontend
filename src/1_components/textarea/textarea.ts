import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'app-textarea',
	templateUrl: './textarea.html',
	styleUrl: './textarea.scss',
	standalone: true,
})
export class TextArea {
	@HostBinding('class.focused')
	public isFocused = false;

	focus() {
		this.isFocused = true;
	}

	blur() {
		this.isFocused = false;
	}
}
