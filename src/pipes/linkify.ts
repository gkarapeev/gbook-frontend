import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'linkify' })
export class LinkifyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return value;
    const urlRegex = /(\bhttps?:\/\/[^\s]+)/gi;
    const linked = value.replace(urlRegex, (url) => {
      const displayUrl = url.replace(/^https?:\/\//, '');
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${displayUrl}</a>`
    }
    );
    return this.sanitizer.bypassSecurityTrustHtml(linked);
  }
}
