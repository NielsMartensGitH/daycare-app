import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-child-edit',
  templateUrl: './child-edit.component.html',
  styleUrls: ['./child-edit.component.css']
})
export class ChildEditComponent implements OnInit {
  @Input() childToEdit!:any;
  childEditForm!:FormGroup;
  child$!:Child;
  constructor(private dataStorage:DatastorageService) { }


  ngOnChanges() {
    {
     this.ngOnInit();
   }
 }

  ngOnInit(): void {
    this.childEditForm = new FormGroup({
      'child_firstname': new FormControl(null, Validators.required),
      'child_lastname': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'childcode': new FormControl('1', Validators.pattern('(04)[0-9 ]{8}'))
    })

    this.childEditForm.patchValue({
      'child_firstname': this.childToEdit.child_firstname,
      'child_lastname': this.childToEdit.child_lastname,
      'age': this.childToEdit.age,
      'childcode': this.childToEdit.childcode

    })
  }

  onSubmit(child_firstname:any, child_lastname:any, age:any, childcode:any){
    console.log(child_firstname, child_lastname, age, childcode)
  }

}
