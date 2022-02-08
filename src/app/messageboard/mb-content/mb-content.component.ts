import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mb-content',
  templateUrl: './mb-content.component.html',
  styleUrls: ['./mb-content.component.css']
})
export class MbContentComponent implements OnInit {
  curParent!: any;
  constructor() { }

  ngOnInit(): void {
    this.curParent = sessionStorage.getItem('parentID');
    console.log(this.curParent)
  }

}
