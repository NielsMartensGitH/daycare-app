import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent{
  date!:string;
  eventName!:string;
  events$!:[
    { title: string, date: string }
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    dateClick: this.handleDateClick.bind(this),
    events: this.events$
  };

  handleDateClick(arg:any) {
     this.date = arg.dateStr;
     
  }
  
  onSbt(event:string){
    this.events$ = [{title: event, date: this.date}];
    console.log(this.events$);
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends 
     }
  

}
