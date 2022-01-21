import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appModel } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url: string = "http://localhost:8000/api/daycares"


  constructor(private http: HttpClient) { }

  getDaycares(): Observable<any> {
    return this.http.get<[appModel[]]>(this.url).pipe();
  }

  showOneDayCare(id: number): Observable<any> {
    return this.http.get<appModel>(this.url + '/' + id).pipe();
  }

}
