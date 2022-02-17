import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-diaries',
  templateUrl: './diaries.component.html',
  styleUrls: ['./diaries.component.css']
})
export class DiariesComponent implements OnInit {
  diaries$!: any[]; // fetch of all the diaries by one specific daycare
  daycare_id!:any;
  msgId!: number; // for showing ONLY comments of this id 
  msgToggle: boolean = false; // FALSE IS NOT SHOWING COMMENTS , TRUE IS SHOWING COMMENTS

  constructor(private dataStorage: DatastorageService, private timeService: TimeService) { }

  ngOnInit() {
    //assign the id of the current daycare
    this.daycare_id = JSON.parse(sessionStorage.getItem('daycare_id') || '{}' );

    //fetch the diaries by the daycare id
    this.dataStorage.getDiariesByDaycareId(this.daycare_id).subscribe( 
            
      diaries => {
           this.diaries$ = diaries;
           this.diaries$.map((obj:any) => {
              obj.poop = obj.poop.split("&") //split the string of poop styles into an array
            })
            console.log(this.diaries$)
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
