import { Injectable, ɵdefaultKeyValueDiffers } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { TimeService } from 'src/app/time.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

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


  constructor(private dataStorage: DatastorageService, private timeService: TimeService, private router:Router) { }

  ngOnInit(){
    
    if(this.childId == undefined){
      this.childId = sessionStorage.getItem('ChildId');
      console.log('defined it')
    }
    console.log(this.childId + ' im doing it')
    
    this.dataStorage.getChildDiaries(this.childId).subscribe( 
      diaries => {
        console.log("hey uh het zit erin " + this.childId)
        this.diaries$ = diaries;
        this.diaries$.map((obj:any) => {
          obj.poop = obj.poop.split("&")
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
  setchild(newchildid:any){
    this.childId = newchildid;
    console.log(this.childId);
    //this.ngOnInit();
    this.reloadComponent();
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
