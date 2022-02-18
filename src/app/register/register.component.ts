import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Daycare } from 'src/app/shared/model/daycare.model'
import { Router } from '@angular/router';
import { EncrDecrService } from '../encr-decr.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter <Daycare>();
  
  newDayCareForm!: FormGroup;

  //depricated check if registery for daycare or parent
  isdaycare = true;
  
  maySubmit: boolean = false;

  did:any = null;
  dccountry: any = "null";
  dccity: any = "null";
  dcpostalcode: any = "null";
  dcavatar: any="null";
  constructor(private dataStorage: DatastorageService, private router:Router, private EncrDecr: EncrDecrService) { }

  ngOnChanges(){
    //with every change in the form it will check the if it's valid 
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.newDayCareForm = new FormGroup({
      'companyname': new FormControl(null, Validators.required),
      'dcadress': new FormControl(null, Validators.required),
      'dcemail': new FormControl(null, Validators.required),
      'dcphone': new FormControl('1', Validators.pattern('(04)[0-9 ]{8}')),
      'dcpassword': new FormControl(null, Validators.required),
      'dcbtw': new FormControl(null, Validators.required),
      'pasverify': new FormControl(null, Validators.required)
    })
    console.log(this.newDayCareForm.valid)
  }

  Onsubmit(companyname:any, dcadress: any, dcemail: any, dcphone: any, dcpassword: any, dcbtw: any ,pasverify: any){
    //here we check if the password is the same as the second time it has
    if(this.newDayCareForm.valid){
      if (pasverify.value == dcpassword.value){
        //here we encrypt the password before we send it to the database
        dcpassword = this.EncrDecr.set(pasverify.value);
        console.log(dcpassword);
        //daycare model that we send to the daycare table in the database
        const newDaycare = new Daycare(
          this.did, 
          companyname.value, 
          dcadress.value,
          dcemail.value,
          dcphone.value,
          dcpassword,
          dcbtw.value,
          this.dccountry,
          this.dccity,
          this.dcpostalcode,
          this.dcavatar
        )
        console.log(newDaycare)
        //here we do a check to see if the email is already in use
        this.dataStorage.daycareloginsearch(dcemail.value).subscribe(res => {
          if(res.length==0){
            //we add daycare if email is not use
            this.dataStorage.addDaycare(newDaycare).subscribe((data) => {
              console.log(data);
              sessionStorage.setItem('daycare_id', data.id)
              this.router.navigate(['/dashboard'])
              
            });
          }
          else{
            window.alert("Already in use!")
          }
        })
        
      }
      else{
        window.alert("Incorrect password")
      }
    }
    else{
      window.alert("Fill in the form please")
    }
  }
}
