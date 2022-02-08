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
  @Input() diaryId!: number;
  diaryComments$!: Diarycomments[];
  commentId!: number;
  commentText!: string;
  editComment!: string;
  textareaHeight: string = '58px';
  comment_editor!: HTMLElement;

  constructor(private dataStorageService: DatastorageService, private timeService: TimeService) { }

  ngOnInit() {
    this.dataStorageService.getDiaryCommentsbyDiaryId(this.diaryId).subscribe(comments => this.diaryComments$ = comments);
  }

  calculateTimeSince(timeStamp: string) {
    const timestamp = new Date(timeStamp);
    timestamp.setHours( timestamp.getHours() + 1 );
    timestamp.setMinutes( timestamp.getMinutes() + 7);
   
    return this.timeService.timeSince(timestamp);
  }

  onDeleteComment(id: number) {
    this.dataStorageService.deleteDiaryComment(id).subscribe(
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

  updateComment(e: any, el: HTMLElement) {
    if(e.key === "Enter") {
      const toEditId = this.commentId;
      this.onUpdateComment(this.editComment, toEditId);
      this.commentId = 0;    
    }
  }

    autogrow(el: HTMLElement) {
      el.style.height = el.scrollHeight + 'px';
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
