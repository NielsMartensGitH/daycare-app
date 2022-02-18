import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  

  constructor(private router:Router) { }

  ngOnInit() {
    //small check if there is a daycare id in the sessionstorage
    if(sessionStorage.getItem('daycare_id') == null){
      this.router.navigate(['/login'])
    }
  }

  

}
