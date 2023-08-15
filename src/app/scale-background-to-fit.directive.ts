import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

@Directive({
    selector: '[appScaleBackgroundToFit]'
})
export class ScaleBackgroundToFitDirective implements AfterViewInit {

    constructor(private elRef: ElementRef<HTMLElement>) { }

    ngAfterViewInit(): void {
        this.initialize();
    }

    private initialize(): void {
        if (!!this.elRef) {
            this.onResize();
        } else {
            timer(500).subscribe(() => {
                this.initialize();
            });
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?: UIEvent): void {
        const styles = getComputedStyle(this.elRef.nativeElement);
        const width: number = parseInt(styles.width.slice(0,-2));
        const height: number = parseInt(styles.height.slice(0,-2));
        // ASSUMPTION: we know that the width/height in px of the background is used for max-width/-height
        // ASSUMPTION: background image is square -> width == height
        const bgDim: number = parseInt(styles.maxWidth.slice(0,-2));
        // scale to the smaller
        this.elRef.nativeElement.style.backgroundSize = `${Math.min(width, bgDim)}px ${Math.min(height, bgDim)}px`;
    }

}
