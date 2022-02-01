import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Parent } from 'src/app/shared/model/parent.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter <Parent>();
  
  isdaycare = false;
  
  newParent!:Parent;
  id:any = null;
  firstname!: string;
  lastname!: string;
  email!: string;
  phone!: number;
  password!: string;
  pasverify!: string;

  constructor() { }

  ngOnInit(): void {
  }
  Onsubmit(){

    if(this.isdaycare){

    }
    else{
      if (this.pasverify == this.password){
        const newParent = new Parent(
          this.id, this.firstname, this.lastname,this.email,this.phone, this.password
        )
        console.log(newParent)
      }
      else{
        window.alert("Incorrect password")
      }
    }

  }
}
