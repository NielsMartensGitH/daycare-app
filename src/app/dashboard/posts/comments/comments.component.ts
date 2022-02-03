import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input()   toggleComment: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openCloseComment() {
    this.toggleComment = !this.toggleComment;
  }

}
