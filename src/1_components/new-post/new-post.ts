import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
			};

			reader.readAsDataURL(file);
		}
	}

	submitPost(textarea: HTMLTextAreaElement) {
		const content = textarea.value.trim();
		if (content) {
			this.dialogRef.close({ content, image: this.image });
		}
	}
}
