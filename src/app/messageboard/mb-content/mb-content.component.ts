import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { TimeService } from 'src/app/time.service';

@Component({
  selector: 'app-mb-content',
  templateUrl: './mb-content.component.html',
  styleUrls: ['./mb-content.component.css']
})
export class MbContentComponent implements OnInit {
  curParent!: any;
  childids!: any[];
  posts!: any[];
  curDaycare!: any;
  postCheck: boolean = false;
  msgId!: number;
  msgToggle: boolean = false;
  constructor(private dataStorage: DatastorageService, private timeService: TimeService) { }

  ngOnInit(): void {
    this.curParent = sessionStorage.getItem('parentID');
    this.curDaycare = sessionStorage.getItem('linkedDaycareParent');
    
    if(this.curParent != null){
    
        this.dataStorage.getPostsbyParent(this.curParent, this.curDaycare).subscribe(res => {
          this.posts = res;
          console.log(this.posts)
          if(this.posts.length == 0){
            this.postCheck = false;
          }
          else{
            this.postCheck = true;
          }
        })


      // this.dataStorage.getChildParents(this.curParent).subscribe(res => {
      //   console.log(res);
      
      
        // for(let i =0; i<res.length;i++){
        //   this.childids +=(res[i].id);
        //   console.log(res[i].id)
        //   console.log(this.childids)
        // }
        /*
        setTimeout(() => {
          console.log(this.childids)
          if(this.childids.length !=0){
            this.dataStorage.getMessageboardPost(this.childids[0],this.curDaycare).subscribe(res=>{
              for(let i=0;i<res.length; i++){
                this.posts.push(res[i]);
              }
              console.log(res)
            })
          }
        }, 500);
        */
      // });
      
    }
 
  }

  messageId(id: number) {
    if (id == this.msgId) {
      this.msgToggle = false;
      this.msgId = 0;
    } else {
      this.msgId = id;
      this.msgToggle = true;
    }
   
  }

  calculateTimeSince(timeStamp: string) {
    const timestamp = new Date(timeStamp);
    timestamp.setHours( timestamp.getHours() + 1 );
    timestamp.setMinutes( timestamp.getMinutes() + 7);
    return this.timeService.timeSince(timestamp);
  }

}
