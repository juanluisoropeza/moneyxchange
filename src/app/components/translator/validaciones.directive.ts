import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { montosPipe } from "./montos.pipe";

function verificarEspacios(c:AbstractControl) {
  if(c.value == null) return null;
  if(c.value.indexOf(' ') >= 0) {
    return {sinEspacios: true}
  }

  if(!c.value.match(/^\d+(\.\d+)?$/)) {
    return {sinEspacios: true}
  }
}


@Directive({
  selector: "[myCurrencyFormatter]"
})

export class Montos implements OnInit {

  private el: HTMLInputElement;

  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home' ];


  constructor(
    private elementRef: ElementRef,
    private currencyPipe: montosPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.currencyPipe.transform(this.el.value);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.el.value = this.currencyPipe.parse(value); // opossite of transform
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.currencyPipe.transform(value);
  }

  @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }

        // Do not use event.keycode this is deprecated.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        let current: string = this.elementRef.nativeElement.value;
        // We need this because the current value on the DOM element
        // is not yet updated with the value from this event
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regex)) {
            event.preventDefault();
        }
    }

}
