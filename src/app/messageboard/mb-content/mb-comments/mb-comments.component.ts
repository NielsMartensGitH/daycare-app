import { Component, OnInit, Input } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { MbComments } from 'src/app/shared/model/mbcomments.model';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-mb-comments',
  templateUrl: './mb-comments.component.html',
  styleUrls: ['./mb-comments.component.css']
})
export class MbCommentsComponent implements OnInit {
  @Input() postId!: number;

  curDaycare!: any;
  curParent!: any;

  comments$!: MbComments[]
  textareaHeight: string = '58px'
  commentText: string =  "";
  commentId!: number ;
  editComment!: string
  comment_editor!: HTMLElement

  constructor(private dataStorageService: DatastorageService, private timeService: TimeService) { }

  ngOnInit() {

    this.curParent = sessionStorage.getItem('parentID');
    this.curDaycare = sessionStorage.getItem('linkedDaycareParent');

    this.dataStorageService.getCommentsbyPostId(this.postId).subscribe(comments => {
      this.comments$ = comments
      console.log(this.comments$)
      console.log(this.commentId + "ID")
    });
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

  onClickEdit(id: number, comment: string) {
    this.commentId = id;
    this.editComment = comment;
  }


onAddComment(comment: string) {
  const newComment = {
    'id': null,
    'comment': comment,
    'post_id': this.postId,
    'parent_id': this.curParent,
    'daycare_id': null
  }
  this.dataStorageService.addComment(newComment).subscribe(
    () => {
      this.ngOnInit();
    }
  )
}

onUpdateComment(comment: string, id: number) {
  const editedComment = {
    'id': id,
    'comment': comment,
    'post_id': this.postId,
    'parent_id': this.curParent,
    'daycare_id': null
  }

  this.dataStorageService.updateComment(editedComment, id).subscribe(
    () => this.ngOnInit()
  )
}

autogrow(el: HTMLElement) {
  el.style.height = el.scrollHeight + 'px';
}

updateComment(e: any, el: HTMLElement) {
  if(e.key === "Enter") {
    const toEditId = this.commentId;
    this.onUpdateComment(this.editComment, toEditId);
    this.commentId = 0;    
  }
}

triggerFunction(e: any, el: HTMLElement) {
  if(e.key === 'Enter') {
    this.onAddComment(this.commentText)
    this.commentText = "";
    
  } else {
    this.autogrow(el)
  }
}



}
