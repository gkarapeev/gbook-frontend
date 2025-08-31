import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'humanTime',
	pure: true,
})
export class HumanTimePipe implements PipeTransform {
	transform(timestamp: number): string {
		if (!timestamp) return '';

		const now = Date.now();
		const diff = Math.floor((now - timestamp) / 1000);

		if (diff < 3600) {
            const minutes = Math.floor(diff / 60);
			return minutes <= 0 ? 'just now' : `${minutes}m ago`;
		}

		if (diff < 86400) {
			return `${Math.floor(diff / 3600)}h ago`;
		}

		if (diff < 2592000) {
			return `${Math.floor(diff / 86400)}d ago`;
		}

		const d = new Date(timestamp);
		return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
	}
}

