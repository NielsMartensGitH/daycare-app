import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appModel } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url: string = "http://localhost/daycare/public/api"


  constructor(private http: HttpClient) { }

  getDaycares(): Observable<any> {
    return this.http.get<[appModel[]]>(this.url).pipe();
  }

}
