import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-child-diary',
  templateUrl: './child-diary.component.html',
  styleUrls: ['./child-diary.component.css']
})
export class ChildDiaryComponent implements OnInit {
  @Input() child_id!:number; //child if passed from the children
  @Output() diaryAdded = new EventEmitter<any>(); //emit a new diary to the parent via the custom event
  childDiaryForm!:FormGroup; 
  daycare_id = 1;
  moods = ["very good", "good", "not so good", "bad"];
  involvements = ["I am often very interested", "I am sometimes involved", "I find it hard to play", "I am lost in the game"];
  poopies = ['fas fa-poo','fas fa-poo','fas fa-poo','fas fa-poo','fas fa-poo'];
  poopStyle = ["brown-poop","brown-poop","brown-poop","brown-poop","brown-poop"]
  smileIndFood!:string;
  smileIndSleep!:string;
  poopInd!:number;
  moodMsg!:number;
  involvementMsg!:number;
  constructor() { }

  ngOnInit(): void {
    this.childDiaryForm = new FormGroup({
      'message_food': new FormControl(null, Validators.required),
      'message_sleep': new FormControl(null, Validators.required),
      'messageAct': new FormControl(null, Validators.required),
      'extraMessage': new FormControl(null, Validators.required)
    })
  }

  onSubmit(messageFood:string, messageSleep:string, messageAct:string, extraMessage:string){
      const newDiary = {
        type_id: 1,
        child_id: this.child_id,
        food: messageFood,
        foodSmile: this.smileIndFood,
        sleep: messageSleep,
        sleepSmile: this.smileIndSleep,
        poop: this.poopStyle.slice(0, this.poopInd+1).join("&"),
        //poop: this.poopies[this.poopInd],
        mood: this.moods[this.moodMsg],
        activities: messageAct,
        involvement: this.involvements[this.involvementMsg],
        extra_message: extraMessage,
        daycare_id: this.daycare_id,
        privacy: 1
      }
      console.log(newDiary);

      this.diaryAdded.emit(newDiary);
      this.childDiaryForm.reset();
  }

  
  
}
