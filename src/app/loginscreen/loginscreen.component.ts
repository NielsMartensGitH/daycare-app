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
    //here we search the database for the given email
    this.dataStorage.loginsearch(this.email).subscribe(res => {
      if(res.length == 0){
        //if there is no result with the given email we get this warning
        alert("wrong username or password")
      }
      else{
        //here we decrypt the password that is linked to the users email
        let decrPW = this.EncrDecr.get(res[0].password);
        //here we check if the decrypted password and the given password are the same
        if(decrPW == this.password){
          //we set the parents id and and the daycare they are linked to in the sessionstorage for later use
          //and redirect to the messageboard
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
    //console.log(this.password)
    //here we search the database for the given email
    this.dataStorage.daycareloginsearch(this.email).subscribe(res => {
      if(res.length == 0){
        //if there is no result with the given email we get this warning
        alert("wrong username or password")
      }
      else{
        //here we decrypt the password that is linked to the users email
        let decrPW = this.EncrDecr.get(res[0].password);
        //here we check if the decrypted password abd tge guveb password are the same
        if(decrPW == this.password){
          //we setthe daycare gets linked to in the sessionstorage for later use
          //and redirect to the dashboard
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

