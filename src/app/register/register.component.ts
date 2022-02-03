import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Parent } from 'src/app/shared/model/parent.model'
import { Daycare } from 'src/app/shared/model/daycare.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter <Parent>();
  @Output() onSubmit = new EventEmitter <Daycare>();

  isdaycare = true;
  
  newParent!:Parent;
  id:any = null;
  firstname!: string;
  lastname!: string;
  email!: string;
  phone!: number;
  password!: string;
  pasverify!: string;

  newDaycare!: Daycare;
  did:any = null;
  companyname!:string;
  dcadress!: string;
  dcemail!: string;
  dcphone!: number;
  dcpassword!: string;
  dcbtw!: string;
  


  constructor() { }

  ngOnInit(): void {
    let tempbool = sessionStorage.getItem("isdaycare");
    if(tempbool=== "true"){
      this.isdaycare = true;
    }
    else{
      this.isdaycare = false;
    }
  }
  Onsubmit(){

    if(this.isdaycare){
      if (this.pasverify == this.dcpassword){
        const newDaycare = new Daycare(
          this.did, this.companyname, this.dcadress,this.dcemail,this.dcphone, this.dcpassword,this.dcbtw
        )
        console.log(newDaycare)
      }
      else{
        window.alert("Incorrect password")
      }
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
