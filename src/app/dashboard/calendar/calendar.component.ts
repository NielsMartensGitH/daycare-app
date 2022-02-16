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
  events$:Event[] = [];
  calendarOptions!: CalendarOptions;
  color = "#C38D9E"; //color of the event
  daycare_id!:any; //var to store the id from the sessionStorage
  constructor(private dataStorage:DatastorageService){

  }

  ngOnInit() {
    //get the id from the session storage
     this.daycare_id = JSON.parse(sessionStorage.getItem('daycare_id')|| '{}');
     
    //fetch the events only by daycare id 
     this.dataStorage.getEventsByDaycareId(this.daycare_id).subscribe((events) => this.events$ = events)
   
     //console.log(this.events$)
    
     //DELAYING THE CALENDAROPTIONS ASSIGNING BC I NEED TO FETCH THE EVENTS FIRST///

      setTimeout(() => {
        this.calendarOptions= {
          initialView: 'dayGridMonth',
          //dateClick: this.handleDateClick.bind(this), //commented out, but can useful in future
          events: this.events$,
          eventColor : this.color,
        };
      }, 1500)
      
  }

  //LEAVING THE CODE BELOW FOR FUTURE
  // handleDateClick(arg:any) {
  //   this.eventDate = arg.dateStr;

  // }
  
  // ADD A NEW EVENT
  onSbt(event:string, event_date:string){

    //CREATE A NEW EVENT
    const newEvent = {
      title: event,
      date: event_date,
      daycare_id: this.daycare_id
    }
    
  
    this.dataStorage.addEvent(newEvent).subscribe(() => this.ngOnInit());;
    //console.log(this.events$);
    
    
  }

  
  

}
