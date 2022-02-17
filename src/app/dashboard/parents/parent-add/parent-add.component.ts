import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Parent } from 'src/app/shared/model/parent.model';
import { EncrDecrService } from 'src/app/encr-decr.service';


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
  avatar = "/assets/img/defaultavatar.png";
  daycare_id!:any;

  constructor(private EncrDecr: EncrDecrService) { }

  ngOnInit(): void {
    this.daycare_id = sessionStorage.getItem('daycare_id');

    this.parentAddForm = new FormGroup({
        'firstname': new FormControl(null, Validators.required),
        'lastname': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'phone': new FormControl('1', Validators.pattern('(04)[0-9 ]{8}')),
        'password': new FormControl(null, Validators.required)
    })
  }

  

  onSubmit() {

    this.password = this.EncrDecr.set(this.password);
    const newParent = new Parent(
      this.id, this.firstname, this.lastname, this.email, this.phone, this.password, this.daycare_id, this.avatar
     )

    this.onSubmitted.emit(newParent);
    this.parentAddForm.reset()
    console.log(newParent)
  }

  
}
