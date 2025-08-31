import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-new-post',
	templateUrl: './new-post.html',
	styleUrls: ['./new-post.scss'],
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
})
export class NewPostComponent {
	constructor(public dialogRef: MatDialogRef<NewPostComponent>) {}

	previewUrl = signal<string | null>(null);
	image: File | null = null;

	onNewPostKeydown(event: KeyboardEvent, textarea: HTMLTextAreaElement) {
		if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			this.submitPost(textarea);
		}
	}

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			const reader = new FileReader();

			reader.onload = (e: any) => {
				this.previewUrl.set(e.target.result);
				this.image = file;

				let img = new Image();

				img.onerror = () => {
					alert('Couldn\'t read image file. Georgi is to blame.');
					img = null as any;
				};

				img.onload = () => img = null as any;

				img.src = e.target.result;
			};

			reader.onerror = (e) => {
				alert('Error reading file: ' + e);
			};

			reader.readAsDataURL(file);
		}
	}

	submitPost(textarea: HTMLTextAreaElement) {
		const content = textarea.value.trim();

		if (content || this.previewUrl()) {
			this.dialogRef.close({ content, image: this.image });
		}
	}
}

