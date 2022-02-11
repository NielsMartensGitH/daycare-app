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
  filteredEvents!:Event[];
  constructor(private dataStorage:DatastorageService) { }

  ngOnInit(): void {


    this.daycare_id = JSON.parse(sessionStorage.getItem("linkedDaycareParent") || '{}')
     
     this.dataStorage.getEventsByDaycareId(this.daycare_id).subscribe(
       events => 
       this.events$ = events
       )
       setTimeout(() => {
       const currentdate = new Date();
       ///filter out only the upcoming events and reverse to show the closest date on top
           this.filteredEvents = this.events$.filter(ev => <any>new Date(ev.date) >= currentdate.setDate(currentdate.getDate() - 1)).reverse()
          },1000)
    }
     
  }


