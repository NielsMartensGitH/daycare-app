import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appSmile]'
})
export class SmileDirective {
  @HostBinding('class.yellow-face') isYellow = false;
  constructor() { }

  @HostListener("click") brownThePoop(){
   
    this.isYellow = !this.isYellow;
  }

}
