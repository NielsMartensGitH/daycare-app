import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Parent } from 'src/app/shared/model/parent.model';


@Component({
  selector: 'app-parent-add',
  templateUrl: './parent-add.component.html',
  styleUrls: ['./parent-add.component.css']
})
export class ParentAddComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter<Parent>();
  newParent!:Parent;
  id:any = null;
  firstname!:string;
  lastname!:string;
  email!:string;
  phone!:number;
  password!:string;
  constructor() { }

  ngOnInit(): void {
  }

  

  onSubmit() {
    this.onSubmitted.emit(new Parent(
     this.id, this.firstname, this.lastname, this.email, this.phone, this.password
    ))
  }

  
}
