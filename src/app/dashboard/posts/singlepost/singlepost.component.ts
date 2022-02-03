import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input()   toggleComment: boolean = false;


  constructor() { }


  ngOnInit(): void {
  }

  
  openCloseComment() {
    this.toggleComment = !this.toggleComment;
  }

}

