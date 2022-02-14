import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class FileuploadService {

  constructor(private http: HttpClient) { }

  uploadMultiple(formData: any): Observable<any> {

    return this.http.post('http://nodegameofcones.be:4000/multiplefiles', formData)
      
  }




}
