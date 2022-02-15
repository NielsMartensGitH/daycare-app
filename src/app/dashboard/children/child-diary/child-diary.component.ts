import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-child-diary',
  templateUrl: './child-diary.component.html',
  styleUrls: ['./child-diary.component.css']
})
export class ChildDiaryComponent implements OnInit {
  @Input() child!:Child //child passed from the children
  @Output() diaryAdded = new EventEmitter<any>(); //emit a new diary to the parent via the custom event
  @Output() btnStatusChange = new EventEmitter<Child>();
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
  parsedChild!:any;
  yellowFace = false;
  poos = [false, false, false,false,false];
  passedInChild!:Child;
  //childName = `${this.passed_child.child_firstname} ${this.passed_child.child_lastname}`
  constructor(private dataStorage:DatastorageService) { }



  ngOnChanges(){

    for (let i = 0; i < this.poos.length; i++){
      this.poos[i] = false;
      
    }
    console.log(this.poos)
    this.ngOnInit()
  }

  

  ngOnInit(): void {
    this.childDiaryForm = new FormGroup({
      'message_food': new FormControl(null, Validators.required),
      'message_sleep': new FormControl(null, Validators.required),
      'messageAct': new FormControl(null, Validators.required),
      'extraMessage': new FormControl(null, Validators.required)
    })
    
    //this.dataStorage.getChildById(this.child_id).subscribe(child => this.passedInChild = child)
    
  }
  
  

  onSubmit(messageFood:string, messageSleep:string, messageAct:string, extraMessage:string){
      const newDiary = {
        type_id: 1,
        child_id: this.child.id,
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
      
      //Set all the values of the poos to false
      this.poos.map((el) => el = false)
      
      this.childDiaryForm.reset();
  }

  onPoop(ind:number){
    console.log(ind)
    for (let i = ind; i >= 0; i--){
         this.poos[i] = true;
    }
  }
  
  onClose(){
    this.poos.forEach((el) => el=false);
    this.ngOnInit();
  }

  onStatusChange(child:Child){
    child.diary_sent = 1;
    this.btnStatusChange.emit(child)
  }
  
}
