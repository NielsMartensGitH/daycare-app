import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Event } from 'src/app/shared/model/event.models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent{
  eventDate!:string;
  eventName!:string;
  events$:Event[] = [];
  id!:number;
  calendarOptions!: CalendarOptions;
  
  ngOnInit() {
      this.calendarOptions= {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      events: this.events$
    };
  }
  handleDateClick(arg:any) {
     this.eventDate = arg.dateStr;
     
  }
  
  onSbt(event:string){
    const newEvent = {
      title: event,
      date: this.eventDate
    }
    this.events$.push(newEvent);
    console.log(this.events$);
    this.ngOnInit();
  }

  
  

}
