import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { AvatarUploadComponent } from "../../1_components/image-upload/image-upload";
import { AuthService } from "../../services/auth/auth.service";

@Component({
	template: `
        @let id = $any((data | async)).id;

        @if (authService.user()?.id === id) {
            <button id="edit-img" matButton="outlined" color="primary" (click)="edit()">
                <mat-icon fontIcon="edit" style="margin: 0;"></mat-icon>
            </button>
        }

        <img [src]="'/content/avatars/' + id + '.jpg'" (click)="close()" />
    `,
	styles: `
        @use 'variables' as v;

        img {
            width: 100%;
            display: block;
            padding: v.$size-1;
            border-radius: var(--mat-sys-corner-extra-large);
        }

        #edit-img {
            position: absolute;
            top: calc(v.$size-2);
            right: calc(v.$size-2);
            min-width: 0;
            padding: 0;
            width: 40px;
        }
    `,
	standalone: true,
	imports: [AsyncPipe, MatButton, MatIcon],
})
export class BigPic {
	private dialog = inject(MatDialog);
    private dialogRef = inject(MatDialogRef<BigPic>);
    public data = inject(MAT_DIALOG_DATA);
    public authService = inject(AuthService);

    public close = () => {
        this.dialogRef.close();
    }

    public edit = () => {
        this.dialogRef.close();
        this.dialog.open(AvatarUploadComponent);
    }
}