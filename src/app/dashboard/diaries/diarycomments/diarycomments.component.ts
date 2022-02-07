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
  diaryComments$!: Diarycomments[]
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

}
