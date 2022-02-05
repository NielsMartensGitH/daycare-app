import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDiaryDir]'
})
export class DiaryDirDirective {
  @HostBinding('class.brown-poop') isBrown = false;

  constructor() { }

  @HostListener("mouseover") brownThePoop(){
    this.isBrown = !this.isBrown;
  }

}
