import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  timeSince(date: Date) {
    
    

    const seconds = Math.floor((+new Date() - +date) / 1000); // seconds between today and given timestamp in parameter

    //  YEAR OR YEARS AGO
    let interval = seconds / 31536000; // seconds in a year
    if (interval > 1) {
      const timeAgo = Math.floor(interval);
      if (timeAgo == 1) {
        return timeAgo + " year";  
      }
      return timeAgo + " years";
    }

    // MONTH OR MONTHS AGO
    interval = seconds / 2592000; // seconds in a month
    if (interval > 1) {
      const timeAgo = Math.floor(interval);
      if (timeAgo == 1) {
        return timeAgo + " month";  
      }
      return timeAgo + " months";
    }

    // DAY OR DAYS AGO
    interval = seconds / 86400; // seconds in a day
    if (interval > 1) {
      const timeAgo = Math.floor(interval);
      if (timeAgo == 1) {
        return timeAgo + " day";  
      }
      return timeAgo + " days";
    }

    // HOUR OR HOURS AGO
    interval = seconds / 3600; // seconds in an hour
    if (interval > 1) {
      const timeAgo = Math.floor(interval)
      if (timeAgo == 1) {
        return timeAgo + " hour";  
      }
      return timeAgo + " hours";
    }


    // MINUTE OR MINUTES AGO
    interval = seconds / 60; // seconds in a minute
    if (interval > 1) {
      const timeAgo = Math.floor(interval)
      if (timeAgo == 1) {
        return timeAgo + " minute";
      }
      return timeAgo + " minutes";
    }
    // return Math.floor(seconds) + " seconds";
    return "a moment";
  }


}


