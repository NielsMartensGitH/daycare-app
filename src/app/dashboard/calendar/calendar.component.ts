import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DatastorageService } from 'src/app/datastorage.service';
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
  
  constructor(private dataStorage:DatastorageService){

  }

  ngOnInit() {
    
     this.dataStorage.getAllEvents().subscribe((events) => this.events$ = events)


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
    this.dataStorage.addEvent(newEvent).subscribe(() => this.ngOnInit());;
    console.log(this.events$);
    
    
  }

  
  

}
