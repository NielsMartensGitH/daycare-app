import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-diary',
  templateUrl: './child-diary.component.html',
  styleUrls: ['./child-diary.component.css']
})
export class ChildDiaryComponent implements OnInit {
  moods = ["very good", "good", "not so good", "bad"];
  involvement = ["I am often very interested", "I am sometimes involved", "I find it hard to play", "I am lost in the game"];
  smileIndFood!:number;
  smileIndSleep!:number;
  poopInd!:number;
  moodMsg!:number;
  involvementMsg!:number;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(messageFood:string, messageSleep:string, messageAct:string){
      const newDiary = {
        food: messageFood,
        foodSmile: this.smileIndFood,
        sleep: messageSleep,
        sleepSmile: this.smileIndSleep,
        pooped: this.poopInd,
        mood: this.moods[this.moodMsg],
        activities: messageAct,
        invol: this.involvement[this.involvementMsg]
      }
      console.log(newDiary)
  }

  
}
