import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  parentAddForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.parentAddForm = new FormGroup({
        'firstname': new FormControl(null, Validators.required),
        'lastname': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'phone': new FormControl('1', Validators.pattern('(04)[0-9 ]{8}')),
        'password': new FormControl(null, Validators.required)
    })
  }

  

  onSubmit() {


    const newParent = new Parent(
      this.id, this.firstname, this.lastname, this.email, this.phone, this.password
     )

    this.onSubmitted.emit(newParent);
    this.parentAddForm.reset()
  }

  
}
