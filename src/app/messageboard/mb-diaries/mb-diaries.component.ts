import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-mb-diaries',
  templateUrl: './mb-diaries.component.html',
  styleUrls: ['./mb-diaries.component.css']
})
export class MbDiariesComponent implements OnInit {
  diaries$!: any[]; // fetch of all the diaries by one specific daycare

  msgId!: number; // for showing ONLY comments of this id 
  msgToggle: boolean = false; // FALSE IS NOT SHOWING COMMENTS , TRUE IS SHOWING COMMENTS
  childId!: any;
  

  constructor(private dataStorage: DatastorageService, private timeService: TimeService) { }

  ngOnInit(): void {

    this.childId = sessionStorage.getItem('childId');
    this.dataStorage.getChildDiaries(this.childId).subscribe( 
      diaries => {
        this.diaries$ = diaries;
        this.diaries$.map((obj:any) => {
          obj.poop = obj.poop.split("&")
        })
      })
  }

    // METHOD WHICH SENDS A TIMESTAMP TO OUR TimeService

    calculateTimeSince(timeStamp: string) {
      const timestamp = new Date(timeStamp);
      timestamp.setHours( timestamp.getHours() + 1 );
      timestamp.setMinutes( timestamp.getMinutes() + 7);
      return this.timeService.timeSince(timestamp);
    }


     // DELETE DIARY

  deleteDiary(id: number) {
    this.dataStorage.deleteDiary(id).subscribe(() => this.ngOnInit());
 }

 
 messageId(id: number) {
  if (id == this.msgId) { // When we already opened the comments of this posts (when msgID is already known) it will close again
    this.msgToggle = false;
    this.msgId = 0;
  } else { // else comments will be shown
    this.msgId = id;
    this.msgToggle = true;
  }
 
}
}
