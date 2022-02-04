import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Parent } from 'src/app/shared/model/parent.model';

@Component({
  selector: 'app-parent-edit',
  templateUrl: './parent-edit.component.html',
  styleUrls: ['./parent-edit.component.css']
})
export class ParentEditComponent implements OnInit {
  @Input() parentToEdit!:any;
  @Output() edittedParent = new EventEmitter<Parent>();
  parentEditForm!:FormGroup;
  id:any;
  constructor() { }

  ngOnChanges() {
    {
     this.ngOnInit();
   }
 }

  ngOnInit(): void {
    this.parentEditForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl('1', Validators.pattern('(04)[0-9 ]{8}')),
      'password': new FormControl(null, Validators.required)
    })

    this.parentEditForm.patchValue({
      'firstname': this.parentToEdit.firstname,
      'lastname': this.parentToEdit.lastname,
      'email': this.parentToEdit.email,
      'phone': this.parentToEdit.phone,
      'password': this.parentToEdit.password

    })
  }

  onSubmit(firstname:string, lastname:string, email:string, phone:any, password:string) {


    const newParent = new Parent(
      this.parentToEdit.id, firstname, lastname, email, phone, password
     )
    
    this.edittedParent.emit(newParent);

  }


}
