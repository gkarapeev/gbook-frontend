import { Component } from '@angular/core';

@Component({
	selector: 'app-textarea',
	template: `
		<div class="field-wrapper">
			<div class="second">
				<div class="focus-overlay"></div>

				<div class="mat-mdc-form-field-flex">
					<div class="mat-mdc-form-field-infix">
						<textarea
							name='textarea'
							type="textarea"
							rows="3"
							cols="40"
							placeholder="Write a new post..."
						></textarea>
					</div>
				</div>
				<div class="ripple"></div>
			</div>
		</div>
	`,
	styles: `
        @use '../styles/variables' as v;

        .field-wrapper {
            flex-grow: 1;
        }

        .second {
            background-color: var(--mat-sys-surface-variant);
            height: auto;
            will-change: auto;
            border-top-left-radius: var(--mat-sys-corner-extra-small);
            border-top-right-radius: var(--mat-sys-corner-extra-small);
            padding: 0 v.$size-1;
			position: relative;

			&:hover {
				background-color: var(--mat-sys-surface-variant)
			}
        }

		.focus-overlay {
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			pointer-events: none;
		}

		textarea {
			background: none;
			border: none;
			resize: vertical;
			padding: 0;
			width: 100%;

            -webkit-font-smoothing: antialiased;
            font-family: var(--mat-sys-body-large-font);
            line-height: var(--mat-sys-body-large-line-height);
            font-size: var(--mat-sys-body-large-size);
            letter-spacing: var(--mat-sys-body-large-tracking);
            font-weight: var(--mat-sys-body-large-weight);

			&:focus {
				outline: none;
			}
		}

		.ripple {
			&::before,
			&::after {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				border-bottom-style: solid;
				border-bottom-color: var(--mat-sys-on-surface-variant);
				border-bottom-width: 1px;

				content: "";
			}
		}
    `,
	standalone: true,
})
export class TextArea {}
