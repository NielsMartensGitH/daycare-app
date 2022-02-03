import { Component, OnInit } from '@angular/core';

import { Routes } from '@angular/router';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.css']
})
export class LoginscreenComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  Plogin(){

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

