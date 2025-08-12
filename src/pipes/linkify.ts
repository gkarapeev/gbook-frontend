import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'linkify' })
export class LinkifyPipe implements PipeTransform {
	transform(value: string): string {
		if (!value) {
			return '';
		}

    const escaped = value
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/javascript/g, 'null')
			.replace(/onclick/g, 'null');

    const displayUrl = escaped.replace(/^https?:\/\//, '');

		return escaped.replace(
			/(https?:\/\/[^\s]+)/g,
			`<a href="$1" target="_blank" rel="noopener noreferrer">${displayUrl}</a>`
		);
	}
}
