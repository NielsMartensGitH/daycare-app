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
      if (this.pasverify == this.dcpassword){
        this.dcpassword = this.EncrDecr.set(this.pasverify);
        console.log(this.dcpassword);
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
        
        this.dataStorage.daycareloginsearch(this.dcemail).subscribe(res => {
          if(res.length==0){
            this.dataStorage.addDaycare(newDaycare).subscribe(() => this.ngOnInit());
        
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
