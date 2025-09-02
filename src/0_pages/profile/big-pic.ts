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
            <button id="edit-img" mat-raised-button color="primary" (click)="edit()">
                <mat-icon fontIcon="edit" style="margin: 0;"></mat-icon>
            </button>
        }

        <img [src]="'/content/avatars/' + id + '.jpg'" (click)="close()" />
    `,
	styles: `
        @use 'variables' as v;

        ::ng-deep .big-pic-dialog {
            .mat-mdc-dialog-surface {
                border-radius: var(--mat-sys-corner-full);
            }
        }

        img {
            width: 100%;
            display: block;
            padding: v.$size-1;
            border-radius: var(--mat-sys-corner-full);
            width: 280px;
            height: 280px;
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        #edit-img {
            position: fixed;
            top: calc(50dvh - 115px);
            right: calc(50dvw - 110px);
            min-width: 0;
            padding: 0;
            width: 40px;
            z-index: 1;
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