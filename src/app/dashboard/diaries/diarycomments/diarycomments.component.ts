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
  commentId!: number
  editComment!: string
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
      'post_id': this.diaryId,
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

}
