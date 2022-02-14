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

  pasverify!: string;
  
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
      'dcbtw': new FormControl(null, Validators.required)
    })
    console.log(this.newDayCareForm.valid)
  }

  Onsubmit(companyname:any, dcadress: any, dcemail: any, dcphone: any, dcpassword: any, dcbtw: any){
    //here we check if the password is the same as the second time it has
    if(this.newDayCareForm.valid){
      if (this.pasverify == dcpassword){
        //here we encrypt the password before we send it to the database
        dcpassword = this.EncrDecr.set(this.pasverify);
        //console.log(this.dcpassword);
        //daycare model that we send to the daycare table in the database
        const newDaycare = new Daycare(
          this.did, 
          companyname, 
          dcadress,
          dcemail,
          dcphone, 
          dcpassword,
          dcbtw,
          this.dccountry,
          this.dccity,
          this.dcpostalcode,
          this.dcavatar
        )
        //here we do a check to see if the email is already in use
        this.dataStorage.daycareloginsearch(dcemail).subscribe(res => {
          if(res.length==0){
            //we add daycare if email is not use
            this.dataStorage.addDaycare(newDaycare).subscribe(() => this.ngOnInit());
            //we use a timeout in order to be able to pull the id of the newly created
            //daycare (yes this can be done with the return function when making a new daycare but i haven't figured
            //it out yet) and then we redirect
            setTimeout(() => {
              this.succesfull(dcemail);
            }, 500);
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

  succesfull(dcemail:any){ 
    this.dataStorage.daycareloginsearch(dcemail).subscribe(res => {
      console.log(res)
      if(res.length != 0){
        sessionStorage.setItem('daycare_id', res[0].id)
        this.router.navigate(['/dashboard'])
      }      
    });
  }
}
