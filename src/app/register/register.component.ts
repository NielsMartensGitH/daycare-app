import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Daycare } from 'src/app/shared/model/daycare.model'
import { Router } from '@angular/router';
import { EncrDecrService } from '../encr-decr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter <Daycare>();
  
  //depricated check if registery for daycare or parent
  isdaycare = true;

  pasverify!: string;
  
  newDaycare!: Daycare;
  did:any = null;
  companyname!:string;
  dcadress!: string;
  dcemail!: string;
  dcphone!: number;
  dcpassword!: string;
  dcbtw!: string;
  dccountry: any = "null";
  dccity: any = "null";
  dcpostalcode: any = "null";
  dcavatar: any="null"
  
  constructor(private dataStorage: DatastorageService, private router:Router, private EncrDecr: EncrDecrService) { }

  ngOnInit(): void {
        
  }

  Onsubmit(){
    //here we check if the passwor is the same as the second time it has
      if (this.pasverify == this.dcpassword){
        //here we encrypt the password before we send it to the database
        this.dcpassword = this.EncrDecr.set(this.pasverify);
        //console.log(this.dcpassword);
        //daycare model that we send to the daycare table in the database
        const newDaycare = new Daycare(
          this.did, 
          this.companyname, 
          this.dcadress,
          this.dcemail,
          this.dcphone, 
          this.dcpassword,
          this.dcbtw,
          this.dccountry,
          this.dccity,
          this.dcpostalcode,
          this.dcavatar
        )
        //here we do a check to see if the email is already in use
        this.dataStorage.daycareloginsearch(this.dcemail).subscribe(res => {
          if(res.length==0){
            //we add daycare if email is not use
            this.dataStorage.addDaycare(newDaycare).subscribe(() => this.ngOnInit());
            //we use a timeout in order to be able to pull the id of the newly created
            //daycare (yes this can be done with the return function when making a new daycare but i haven't figured
            //it out yet) and then we redirect
            setTimeout(() => {
              this.succesfull();
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

  succesfull(){ 
    this.dataStorage.daycareloginsearch(this.dcemail).subscribe(res => {
      console.log(res)
      if(res.length != 0){
        sessionStorage.setItem('daycare_id', res[0].id)
        this.router.navigate(['/dashboard'])
      }      
    });
  }
}
