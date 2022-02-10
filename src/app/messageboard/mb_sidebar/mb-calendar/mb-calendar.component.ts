import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Event } from 'src/app/shared/model/event.models';

@Component({
  selector: 'app-mb-calendar',
  templateUrl: './mb-calendar.component.html',
  styleUrls: ['./mb-calendar.component.css']
})
export class MbCalendarComponent implements OnInit {
  daycare_id!: number; 
  events$!:Event[];
  constructor(private dataStorage:DatastorageService) { }

  ngOnInit(): void {


    this.daycare_id = JSON.parse(sessionStorage.getItem("linkedDaycareParent") || '{}')

     this.dataStorage.getEventsByDaycareId(this.daycare_id).subscribe(events => this.events$ = events)
     }
     
  }


