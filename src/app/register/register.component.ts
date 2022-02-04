import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Daycare } from 'src/app/shared/model/daycare.model'

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
  dccountry: any = null;
  dccity: any = null;
  dcpostalcode: any = null;
  


  constructor(private dataStorage: DatastorageService) { }

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
      if (this.pasverify == this.dcpassword){
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
          this.dcpostalcode
        )
        console.log(newDaycare)
        this.onSubmitted.emit(newDaycare);
      }
      else{
        window.alert("Incorrect password")
      }
  }
}
