import {Directive, ElementRef} from "@angular/core";

@Directive({
    selector:'[appHasPermission]',
    standalone: true
})
export class HasPermissionDirective {
    constructor(private elementRef: ElementRef) {
    }
}