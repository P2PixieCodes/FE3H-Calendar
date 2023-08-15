import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appScaleToFraction]'
})
export class ScaleToFractionDirective {

    constructor(private el: ElementRef) {}

    @HostListener('window:resize', ['$event'])
    onResize(event: UIEvent): void {
        
    }
    

/*
$calendar-width: 1054px;
$calendar-height: 33614px; // remember to adjust this if you make any changes to margins and such (simply comment out the calendar scaling and check the element's height)
$calendar-scale: 1;
$calendar-container-width: calc($calendar-width * $calendar-scale);
$calendar-container-height: calc($calendar-height * $calendar-scale);
$calendar-scale-move-up: calc(-1 * ($calendar-height - $calendar-height * $calendar-scale) / 2);
$calendar-scale-move-left: calc(-1 * ($calendar-width - $calendar-width * $calendar-scale) / 2);

.calendar-container {
    width: $calendar-container-width;
    height: $calendar-container-height;
    overflow: hidden;
    .calendar {
        outline: 1px solid rgba(255,0,0,0.5);
        width: $calendar-width;
        height: $calendar-height;
        position: relative;
        transform: scale($calendar-scale);
        top: $calendar-scale-move-up;
        left: $calendar-scale-move-left;
    }
}
*/

}
