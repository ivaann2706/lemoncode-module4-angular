import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appRotate]',
})
export class RotateDirective {
    @Input('appRotate') step: number = 15;

    private angle: number = 0;

    constructor(private el: ElementRef) {}

    @HostListener('click', ['$event']) onMouseClick(event: MouseEvent) {
        if (event.shiftKey) {
            this.angle -= this.step;
        } else {
            this.angle += this.step;
        }
        this.rotate();
    }

    private rotate() {
        this.el.nativeElement.style.transform = `rotate(${this.angle}deg)`;
    }
}
