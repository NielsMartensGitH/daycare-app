import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-diary',
  templateUrl: './child-diary.component.html',
  styleUrls: ['./child-diary.component.css']
})
export class ChildDiaryComponent implements OnInit {
  moods = ["very good", "good", "not so good", "bad"];
  involvements = ["I am often very interested", "I am sometimes involved", "I find it hard to play", "I am lost in the game"];
  poopies = ['fas fa-poo','fas fa-poo','fas fa-poo','fas fa-poo','fas fa-poo']
  smileIndFood!:string;
  smileIndSleep!:string;
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
        poop: this.poopies.slice(0, this.poopInd+1),
        mood: this.moods[this.moodMsg],
        activities: messageAct,
        involvement: this.involvements[this.involvementMsg]
      }
      console.log(newDiary)
  }

  
}
