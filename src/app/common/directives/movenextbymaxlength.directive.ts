import { Directive, ElementRef, HostListener, Input, NgModule } from '@angular/core';

@Directive({
selector: '[moveNextByMaxLength]'
})
export class MoveNextByMaxLengthDirective {

constructor(private _el: ElementRef) { }

@HostListener('keyup', ['$event']) onKeyDown(e: any) {

    const charCode = e.which || e.keyCode;

    if (e.srcElement.maxLength === e.srcElement.value.length && e.key !== 'Tab' && charCode !== 16 && charCode !== 9) {
        e.preventDefault();
        var tidx  = +(e.srcElement.getAttribute('tabindex')) + 1;
        let elems = document.getElementsByTagName('input');

        for (var i= elems.length; i--;) {
            var tidx2 = +(elems[i].getAttribute('tabindex'));
            if (tidx2 == tidx) elems[i].focus();
        }
    }
  }
}

@NgModule({
  declarations: [ MoveNextByMaxLengthDirective ],
  exports: [ MoveNextByMaxLengthDirective ]
})

export class MoveNextByMaxLengthDirectiveModule {}
