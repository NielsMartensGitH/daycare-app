import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appImgToggle]'
})
export class ImgToggleDirective {
  @HostBinding('class.green-border') isClicked = false;
  constructor() { }

  @HostListener("dblclick") imgToggle(){
    this.isClicked = !this.isClicked;
  }

}
