import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {

  parent_id!:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    //here we check if the person has logged in as a parent
    //if not then they will be send back to the loginscreen
    if(sessionStorage.getItem('parentID')===null){
      //this.router.navigate(['/login'])
    }
    this.parent_id = sessionStorage.getItem('parentID')
  }

}
