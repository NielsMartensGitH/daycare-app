import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mb-sidebar',
  templateUrl: './mb-sidebar.component.html',
  styleUrls: ['./mb-sidebar.component.css']
})
export class MbSidebarComponent implements OnInit {
  @Input() parentID!:number;
  constructor() { }

  ngOnInit(): void {
  }

}
