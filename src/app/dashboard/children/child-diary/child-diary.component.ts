import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-child-diary',
  templateUrl: './child-diary.component.html',
  styleUrls: ['./child-diary.component.css']
})
export class ChildDiaryComponent implements OnInit {
  @Input() child!:Child //child passed from the children
  @Output() diaryAdded = new EventEmitter<any>(); //emit a new diary to the parent via the custom event
  childDiaryForm!:FormGroup; 
  daycare_id!:any; //this sets the daycare id
  moods = ["very good", "good", "not so good", "bad"]; 
  involvements = ["I am often very interested", "I am sometimes involved", "I find it hard to play", "I am lost in the game"];
  poopies = ['fas fa-poo','fas fa-poo','fas fa-poo','fas fa-poo','fas fa-poo'];//what we loop through in the child-diary
  poopStyle = ["brown-poop","brown-poop","brown-poop","brown-poop","brown-poop"];//what we send to the server
  smileIndFood!:string;
  smileIndSleep!:string;
  poopInd!:number;
  moodMsg!:number;
  involvementMsg!:number;
  poos = [false, false, false,false,false];
  passedInChild!:Child;
  constructor() { }



  ngOnChanges(){
    //when you the input from the parent component changes -> set the ngClass condition to false
    for (let i = 0; i < this.poos.length; i++){
      this.poos[i] = false;
      
    }
    console.log(this.poos)
    this.ngOnInit()
  }

  

  ngOnInit(): void {
    //ASSIGN THE DAYCAYRE ID IN THE SESSION STORAGE 
    this.daycare_id = sessionStorage.getItem('daycare_id');

    //FORM INPUT VALIDATORS
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
        //slice only the right amount of poop styles and assign it as a string
        poop: this.poopStyle.slice(0, this.poopInd+1).join("&"), 
        mood: this.moods[this.moodMsg], //get a certain mood by its id
        activities: messageAct,
        involvement: this.involvements[this.involvementMsg], //get a certain involvement by its id
        extra_message: extraMessage,
        daycare_id: this.daycare_id,
        privacy: 1 //the privacy is always set to 1, bc the diaries are always private
      }
      console.log(newDiary);

      this.diaryAdded.emit(newDiary); //emit to children comp, where the service methods posts it
      
      //Set all the values of the poos to false
      this.poos.map((el) => el = false)
      
      this.childDiaryForm.reset(); //reset all the input fields
  }

  //this method gets the id of the poop, assigns it to poopInd (so we can use it as arg in slicing the poopStyle array)
  //and also sets all the poops whose index is lower than the ind
  onPoop(ind:number){
    this.poopInd = ind;
    console.log(ind)
    for (let i = ind; i >= 0; i--){
         this.poos[i] = true;
    }
  }
  
  //when pressed close -> set all the poop ngClass condition to false, so poops are not brown anymore
  onClose(){
    this.poos.forEach((el) => el=false);
    this.ngOnInit();
  }

  
  
}
