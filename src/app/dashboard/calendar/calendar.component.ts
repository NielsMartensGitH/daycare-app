import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Event } from 'src/app/shared/model/event.models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  eventDate!:string;
  eventName!:string;
  events$:Event[] = [];
  id!:number;
  calendarOptions!: CalendarOptions;
  
  ngOnInit() {
      setTimeout(() => {
        this.calendarOptions= {
          initialView: 'dayGridMonth',
          dateClick: this.handleDateClick.bind(this),
          events: this.events$
        };
      }, 2500)
      
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
    setTimeout(() => {
      this.ngOnInit();
    }, 2200)
    
  }

  
  

}
