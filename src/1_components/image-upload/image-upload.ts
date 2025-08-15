import { Component, EventEmitter, inject, Output } from '@angular/core';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
	selector: 'app-image-upload',
	templateUrl: './image-upload.html',
	styleUrls: ['./image-upload.scss'],
})
export class ImageUploadComponent {
	private authService = inject(AuthService);
	private userService = inject(UserService);

    @Output() end = new EventEmitter<void>();

	selectedFile: File | null = null;
	uploadStatus: string = '';

	onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.selectedFile = input.files[0];
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
                    this.uploadStatus = 'Upload successful!';
                    this.end.emit();
                },
				error: () => {
                    this.uploadStatus = 'Upload failed.';
                    this.end.emit();
                },
			});
	}
}

