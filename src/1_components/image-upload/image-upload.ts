import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-image-upload',
	templateUrl: './image-upload.html',
	styleUrls: ['./image-upload.scss'],
	imports: [MatButton, MatIcon],
})
export class AvatarUploadComponent {
	private authService = inject(AuthService);
	private userService = inject(UserService);
	public dialogRef = inject(MatDialogRef<AvatarUploadComponent>);

	selectedFile: File | null = null;
	uploadStatus = signal<string | null>(null);
	previewUrl = signal<string | null>(null);

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.selectedFile = input.files[0];

			const reader = new FileReader();

			reader.onload = (e: any) => {
				this.previewUrl.set(e.target.result);

				let img = new Image();

				img.onerror = () => {
					alert("Couldn't read image file. Georgi is to blame.");
					img = null as any;
				};

				img.onload = () => (img = null as any);

				img.src = e.target.result;
			};

			reader.onerror = (e) => {
				alert('Error reading file: ' + e);
			};

			reader.readAsDataURL(this.selectedFile);
		}
	}

	upload() {
		if (!this.selectedFile) {
			return;
		}

		this.userService
			.uploadImage(this.selectedFile, this.authService.user()!.id)
			.subscribe({
				next: () => {
					this.uploadStatus.set('Upload successful!');
					setTimeout(() => {
						this.dialogRef.close("success");
					}, 3000);
				},
				error: (e) => {
					this.uploadStatus.set('Upload failed. Error: ' + e.message);
				},
			});
	}
}

