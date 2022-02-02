import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Parent } from 'src/app/shared/model/parent.model';

@Component({
  selector: 'app-parent-edit',
  templateUrl: './parent-edit.component.html',
  styleUrls: ['./parent-edit.component.css']
})
export class ParentEditComponent implements OnInit {
  parentEditForm!:FormGroup;
  id:any = null;
  constructor() { }

  ngOnInit(): void {
    this.parentEditForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl('1', Validators.pattern('(04)[0-9 ]{8}')),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit(firstname:string, lastname:string, email:string, phone:any, password:string) {


    const newParent = new Parent(
      this.id, firstname, lastname, email, phone, password
     )
    console.log(newParent);
  }

}
