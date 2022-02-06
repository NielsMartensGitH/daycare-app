import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child-diary',
  templateUrl: './child-diary.component.html',
  styleUrls: ['./child-diary.component.css']
})
export class ChildDiaryComponent implements OnInit {
  @Input() child_id!:number;
  @Output() diaryAdded = new EventEmitter<any>();
  daycare_id = 1;
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
        type_id: 1,
        child_id: this.child_id,
        food: messageFood,
        foodSmile: this.smileIndFood,
        sleep: messageSleep,
        sleepSmile: this.smileIndSleep,
        //poop: this.poopies.slice(0, this.poopInd+1),
        poop: this.poopies[this.poopInd],
        mood: this.moods[this.moodMsg],
        activities: messageAct,
        involvement: this.involvements[this.involvementMsg],
        extra_message: "Something",
        daycare_id: this.daycare_id,
        privacy: 1
      }
      console.log(newDiary);

      this.diaryAdded.emit(newDiary);
  }

  
}
