import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Parent } from 'src/app/shared/model/parent.model';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css']
})
export class LoginscreenComponent implements OnInit {
  parents$!:Parent[];
  email!:string;
  password!:string;

  constructor(private dataStorage: DatastorageService) { 
    
  }

  ngOnInit(): void {
    this.dataStorage.getAllParents().subscribe(parents => this.parents$ = parents)
  }

  Plogin(){
    console.log(this.parents$);
    /*
    fetch(this.testurl + '/search/' + this.email).then(res=>res.json()).then(
      res=> {
        if(res.length == 0){
          alert("wrong username or password")
        }
        else{
          if(res[0].password == this.password){
            alert("login succesfull");
          }
          else{
            alert("wrong username or password")
          }
        }
      }
    )
    */
  }
  DClogin(){

  }

  registerP(){
    sessionStorage.setItem("isdaycare", 'false');
  }
  registerDC(){
    sessionStorage.setItem("isdaycare", 'true');
  }
  
}

