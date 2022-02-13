import { Component, OnInit, Input } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { MbComments } from 'src/app/shared/model/comments.model';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number; // we get this from our parent 'PostsComponent'
  curDaycare!: any; // get current daycare id from sessionstorage
  comments$!: MbComments[] // it will store all the comments by a specific post
  textareaHeight: string = '58px' // this value is dynamic and changes when the inputtext of textarea gets bigger
  commentText: string =  "";  // ngModel will have the typed value of the textarea

  commentId!: number  // will be given when editing comment to only edit the comment with this id
  editComment!: string // will be the original comment we want to edit to be filled in in our editField

  comment_editor!: HTMLElement

  constructor(private dataStorageService: DatastorageService, private timeService: TimeService) { }

  ngOnInit() {
    this.curDaycare = sessionStorage.getItem('daycare_id');
    this.dataStorageService.getCommentsbyPostId(this.postId).subscribe(comments => this.comments$ = comments);
  }

  // METHOD WHICH SENDS A TIMESTAMP TO OUR TimeService

  calculateTimeSince(timeStamp: string) {
    const timestamp = new Date(timeStamp);
    timestamp.setHours( timestamp.getHours() + 1 );
    timestamp.setMinutes( timestamp.getMinutes() + 7);
   
    return this.timeService.timeSince(timestamp);
  }

  // FOR DELETING COMMENT

  onDeleteComment(id: number) {
    this.dataStorageService.deleteComment(id).subscribe(
      () => this.ngOnInit()
    );   
  }

  // FOR EDITING COMMENT

  onClickEdit(id: number, comment: string) {
    this.commentId = id;
    this.editComment = comment;
  }

  // WE CREATE A NEW COMMENT WHICH WILL BE LINKED WITH A POST BY ADDING POST_ID

onAddComment(comment: string) {
  const newComment = {
    'id': null,
    'comment': comment,
    'post_id': this.postId,
    'parent_id': null, // KEEPS NULL BECAUSE IT WILL BE POSTED BY A DAYCARE
    'daycare_id': this.curDaycare
  }
  this.dataStorageService.addComment(newComment).subscribe(
    () => {
      this.ngOnInit();
    }
  )
}

// WHEN WE WANT TO UPDATE A COMMENT

onUpdateComment(comment: string, id: number) {
  const editedComment = {
    'id': id,
    'comment': comment,
    'post_id': this.postId,
    'parent_id': null, // KEEPS NULL BECAUSE IT WILL BE EDITED BY A DAYCARE
    'daycare_id': this.curDaycare
  }

  this.dataStorageService.updateComment(editedComment, id).subscribe(
    () => this.ngOnInit()
  )
}

  // this method will make the height of our textarea element grow equally with the scrollheight (scrollheight grows when more text is inputed)
autogrow(el: HTMLElement) {
  el.style.height = el.scrollHeight + 'px';
}

// WE WANT TO UPDATE OUR COMMENT BY PRESSING ENTER IN OUR TEXTAREA , THIS METHOD WILL TRIGGER WHEN KEY IS PRESSED
updateComment(e: any, el: HTMLElement) {
  if(e.key === "Enter") {
    const toEditId = this.commentId;
    this.onUpdateComment(this.editComment, toEditId);
    this.commentId = 0;    
  }
}


// WE WANT TO ADD OUR COMMENT BY PRESSING ENTER IN OUR TEXTAREA , THIS METHOD WILL TRIGGER WHEN KEY IS PRESSED
triggerFunction(e: any, el: HTMLElement) {
  if(e.key === 'Enter') {
    this.onAddComment(this.commentText)
    this.commentText = ""; // the clear the input
    
  } else {
    this.autogrow(el) // by typing something autogrow will calculate the height of our textarea to make all text fit
  }
}

}
