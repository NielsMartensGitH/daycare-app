import { Component, OnInit, Input } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Diarycomments } from 'src/app/shared/model/diarycomments.model';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-diarycomments',
  templateUrl: './diarycomments.component.html',
  styleUrls: ['./diarycomments.component.css']
})
export class DiarycommentsComponent implements OnInit {
  @Input() diaryId!: number // we get this from our parent 'diariesComponent'; 
  diaryComments$!: Diarycomments[]; //  get the comments of a specific diary

  commentId!: number; // will be given when editing comment to only edit the comment with this id
  commentText!: string; // ngModel will have the typed value of the textarea
  editComment!: string;  // will be the original comment we want to edit to be filled in in our editField
  textareaHeight: string = '58px'; // this value is dynamic and changes when the inputtext of textarea gets bigger
  comment_editor!: HTMLElement;

  constructor(private dataStorageService: DatastorageService, private timeService: TimeService) { }

  ngOnInit() {
    this.dataStorageService.getDiaryCommentsbyDiaryId(this.diaryId).subscribe(comments => this.diaryComments$ = comments);
  }

   // METHOD WHICH SENDS A TIMESTAMP TO OUR TimeService

  calculateTimeSince(timeStamp: string) {
    const timestamp = new Date(timeStamp);
    timestamp.setHours( timestamp.getHours() + 1 );
    timestamp.setMinutes( timestamp.getMinutes() + 7);
   
    return this.timeService.timeSince(timestamp);
  }

  // DELETES COMMENT

  onDeleteComment(id: number) {
    this.dataStorageService.deleteDiaryComment(id).subscribe(
      () => this.ngOnInit()
    );   
  }

  // FOR EDITING ONLY A SPECIFIC COMMENT

  onClickEdit(id: number, comment: string) {
    this.commentId = id;
    this.editComment = comment;
  }

  // WE CREATE A NEW COMMENT WHICH WILL BE LINKED WITH A DAIRY BY ADDING DIARY_ID

  onAddComment(comment: string) {
    const newComment = {
      'id': null,
      'comment': comment,
      'diary_id': this.diaryId,
      'parent_id': null,
      'daycare_id': 1
    }
    this.dataStorageService.addDiaryComment(newComment).subscribe(
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
      'diary_id': this.diaryId,
      'parent_id': null,
      'daycare_id': 1
    }
    this.dataStorageService.updateDiaryComment(editedComment, id).subscribe(
      () => this.ngOnInit()
    )
  }


  // WE WANT TO UPDATE OUR COMMENT BY PRESSING ENTER IN OUR TEXTAREA , THIS METHOD WILL TRIGGER WHEN KEY IS PRESSED

  updateComment(e: any, el: HTMLElement) {
    if(e.key === "Enter") {
      const toEditId = this.commentId;
      this.onUpdateComment(this.editComment, toEditId);
      this.commentId = 0;    
    }
  }

    // this method will make the height of our textarea element grow equally with the scrollheight (scrollheight grows when more text is inputed)

    autogrow(el: HTMLElement) {
      el.style.height = el.scrollHeight + 'px';
    }

    // WE WANT TO ADD OUR COMMENT BY PRESSING ENTER IN OUR TEXTAREA , THIS METHOD WILL TRIGGER WHEN KEY IS PRESSED

    triggerFunction(e: any, el: HTMLElement) {
      if(e.key === 'Enter') {
        this.onAddComment(this.commentText)
        this.commentText = "";
        
      } else {
        this.autogrow(el)
      }
    }


}
