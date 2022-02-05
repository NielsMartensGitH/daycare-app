import { Component, OnInit, Input } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Comments } from 'src/app/shared/model/comments.model';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  comments$!: Comments[]
  textareaHeight: string = '58px'
  commentText: string =  ""
  constructor(private dataStorageService: DatastorageService, private timeService: TimeService) { }

  ngOnInit() {
    console.log(this.comments$)
    this.dataStorageService.getCommentsbyPostId(this.postId).subscribe(comments => this.comments$ = comments);
  }

  calculateTimeSince(timeStamp: string) {
    const timestamp = new Date(timeStamp);
    timestamp.setHours( timestamp.getHours() + 1 );
    timestamp.setMinutes( timestamp.getMinutes() + 7);
   
    return this.timeService.timeSince(timestamp);
  }

  onDeleteComment(id: number) {
    this.dataStorageService.deleteComment(id).subscribe(
      () => this.ngOnInit()
    );   
  }

onAddComment(comment: string) {
  const newComment = {
    'id': null,
    'comment': comment,
    'post_id': this.postId,
    'parent_id': null,
    'daycare_id': 1
  }
  this.dataStorageService.addComment(newComment).subscribe(
    () => {
      this.ngOnInit();
    }
  )
}

autogrow(el: HTMLElement) {
  el.style.height = el.scrollHeight + 'px';
}

triggerFunction(e: any, el: HTMLElement) {
  if(e.key === 'Enter') {
    console.log(this.commentText)
    this.onAddComment(this.commentText)
    this.commentText = "";
    
  } else {
    this.autogrow(el)
  }
}

}
