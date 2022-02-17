import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-child-add',
  templateUrl: './child-add.component.html',
  styleUrls: ['./child-add.component.css']
})
export class ChildAddComponent implements OnInit {
  @Output() onChildAdded = new EventEmitter<Child>();
  @Output() closeAddChildBtn = new EventEmitter<boolean>();
  @Input() parentId:any;
  @Input() isClicked:boolean;
  id:any = null;
  child_firstname!:string;
  child_lastname!:string;
  age!:number;
  childcode!:string;
  parent_id!:number;
  checked_in = 0;
  diary_sent = 0;
  daycare_id!:any;
  constructor() { }

  ngOnInit(): void {
    this.daycare_id = sessionStorage.getItem('daycare_id');
  }

  onSubmit(){
   
    const newChild = new Child(
      this.id, this.child_firstname, this.child_lastname, this.age, this.childcode, this.parentId, this.daycare_id, this.checked_in, this.diary_sent
      )

    this.onChildAdded.emit(newChild);
    this.isClicked = false;
    this.closeAddChildBtn.emit(this.isClicked)
  }

  

}
