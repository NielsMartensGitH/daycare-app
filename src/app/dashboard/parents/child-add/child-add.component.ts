import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-child-add',
  templateUrl: './child-add.component.html',
  styleUrls: ['./child-add.component.css']
})
export class ChildAddComponent implements OnInit {
  @Output() onChildAdded = new EventEmitter<Child>();
  id:any = null;
  child_firstname!:string;
  child_lastname!:string;
  age!:number;
  childcode!:string;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
   
    const newChild = new Child(
      this.id, this.child_firstname, this.child_lastname, this.age, this.childcode
      )

    this.onChildAdded.emit(newChild);
    console.log(newChild)
  }

}
