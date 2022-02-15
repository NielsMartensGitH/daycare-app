import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mb-navbar',
  templateUrl: './mb-navbar.component.html',
  styleUrls: ['./mb-navbar.component.css']
})
export class MbNavbarComponent implements OnInit {
  @Input() isMobileSize = false;
  
  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log(this.isMobileSize)
  }
  logOut(){
    //here we clear the whole storage and go back to login
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }
  sideBar(){

  }
}
