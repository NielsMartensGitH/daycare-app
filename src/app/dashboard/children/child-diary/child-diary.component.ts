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
  constructor() { }

  ngOnInit(): void {
  }

  
}
