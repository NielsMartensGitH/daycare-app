import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { appModel } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  daycares$!: appModel[]

  constructor(private appService: AppService){}

  ngOnInit() {
      this.appService.getDaycares().subscribe(daycare => this.daycares$ = daycare)
  }

}
