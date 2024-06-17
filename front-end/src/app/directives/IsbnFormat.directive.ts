import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appIsbnFormat]'
})
export class IsbnFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    let trimmed = input.value.replace(/\s+/g, ''); // Remove existing hyphens

    if (trimmed.length > 0) {
      trimmed = trimmed.match(new RegExp('.{1,3}', 'g')).join('-');
    }

    input.value = trimmed;
  }
}
