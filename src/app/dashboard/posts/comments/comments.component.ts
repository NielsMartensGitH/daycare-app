import { Component, OnInit, Input } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Comments } from 'src/app/shared/model/comments.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  comments$!: Comments[]
  constructor(private dataStorageService: DatastorageService) { }

  ngOnInit() {
    this.dataStorageService.getCommentsbyPostId(this.postId).subscribe(comments => this.comments$ = comments);
  }



}
