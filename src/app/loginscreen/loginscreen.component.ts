import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Router } from '@angular/router';
import { EncrDecrService } from '../encr-decr.service';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css']
})
export class LoginscreenComponent implements OnInit {
  email!:string;
  password!:string;

  constructor(private dataStorage: DatastorageService, private router:Router, private EncrDecr: EncrDecrService) { 
    
  }

  ngOnInit(): void {
  }

  Plogin(){
    this.dataStorage.loginsearch(this.email).subscribe(res => {
      if(res.length == 0){
        alert("wrong username or password")
      }
      else{
        let decrPW = this.EncrDecr.get(res[0].password);
        if(decrPW == this.password){
          sessionStorage.setItem('parentID',res[0].id)
          sessionStorage.setItem('linkedDaycareParent',res[0].daycare_id)
          this.router.navigate(['/messageboard'])
        }
        else{
          alert("wrong username or password")
        }
      }
    });    
  }
  DClogin(){
    console.log(this.password)
    this.dataStorage.daycareloginsearch(this.email).subscribe(res => {
      if(res.length == 0){
        alert("wrong username or password")
      }
      else{
        let decrPW = this.EncrDecr.get(res[0].password);

        if(decrPW == this.password){
          sessionStorage.setItem('daycare_id',res[0].id)
          this.router.navigate(['/dashboard'])
        }
        else{
          alert("wrong username or password")
        }
      }
    }); 
  }
  
}

