import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

@Directive({
    selector: '[appScaleToFraction]'
})
export class ScaleToFractionDirective implements AfterViewInit {

    @Input() fraction: number = 1.0;
    @Input() contentId: string = "";

    private widthPx: number = 0;
    private heightPx: number = 0;

    private initialStyling: {elWidth: string, contentPos: string, contentTrans: string, contentTop: string, contentLeft: string } = {
        elWidth: "",
        contentPos: "",
        contentTrans: "",
        contentLeft: "",
        contentTop: ""
    };

    constructor(private elRef: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        this.initValues();
    }

    private initValues(): void {
        // probably a bit too complex with all the checks?
        // but the CSS loading is so slow that I'd rather play it safe
        if (!!this.elRef) {
            
            const scrollWidth = this.elRef.nativeElement.offsetWidth - this.elRef.nativeElement.clientWidth;
            this.elRef.nativeElement.style.paddingRight = `${scrollWidth}px`;

            const content: HTMLElement | null = this.elRef.nativeElement.querySelector(`#${this.contentId}`);
            if (!!content) {
                const style = getComputedStyle(content);

                this.heightPx = parseInt(style.height.slice(0,-2));
                // this.widthPx = parseInt(style.width.slice(0,-2)) + scrollWidth;
                this.widthPx = parseInt(style.width.slice(0,-2));
                
                this.initialStyling.elWidth = `${this.widthPx}px`;
                this.initialStyling.contentPos = style.position;
                this.initialStyling.contentTrans = style.transform;
                this.initialStyling.contentLeft = style.left;
                this.initialStyling.contentTop = style.top;
                this.onResize();
            } else {
                timer(500).subscribe(() => {
                    this.initValues();
                })
            }
        } else {
            timer(500).subscribe(() => {
                this.initValues();
            });
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?: UIEvent): void {
        if (this.widthPx <= 0 || this.heightPx <= 0) return;

        const el: HTMLElement = this.elRef.nativeElement;

        const parent: HTMLElement | null = el.parentElement;
        const content: HTMLElement | null = el.querySelector(`#${this.contentId}`);
        if (parent === null || content === null) return;

        // const parentWidth: number = parseInt(getComputedStyle(parent).width.slice(0,-2));
        // const scaleWidth: number = parentWidth * this.fraction;
        const scaleWidth: number = parseInt(getComputedStyle(el).width.slice(0,-2))

        if (scaleWidth < this.widthPx) {
            el.style.width = `${scaleWidth}px`;

            const scale = scaleWidth / this.widthPx;

            content.style.position = "relative";
            content.style.transform = `scale(${scale})`;
            content.style.left = `${(-1 * (this.widthPx - scaleWidth ) / 2)}px`;
            content.style.top = `${(-1 * (this.heightPx - this.heightPx*scale ) / 2)}px`;
        } else {
            // undo scaling
            el.style.width = this.initialStyling.elWidth;
            content.style.position = this.initialStyling.contentPos;
            content.style.transform = this.initialStyling.contentTrans;
            content.style.left = this.initialStyling.contentLeft;
            content.style.top = this.initialStyling.contentTop;
        }
    }

}
