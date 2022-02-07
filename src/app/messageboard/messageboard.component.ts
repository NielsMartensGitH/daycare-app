import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {

  parentid!:string;
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('parentID')===null){
      //this.router.navigate(['/login'])
    }
    
  }

}
