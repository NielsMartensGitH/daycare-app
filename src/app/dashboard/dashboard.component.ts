import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { appModel } from '../app.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  daycares$!: appModel[];
  myDaycare!: appModel;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getDaycares().subscribe(daycare => this.daycares$ = daycare)


  }

  showDaycare(id: number): void {
    this.appService.showOneDayCare(id).subscribe(daycare => {
      [this.myDaycare] = daycare;
    })
  }

}
