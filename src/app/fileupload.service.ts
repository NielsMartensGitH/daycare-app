import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root' 
})
export class FileuploadService {

  constructor(private http: HttpClient) { }


  upload(files: any) {

    console.log(files)
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++ ) {
      formData.append('photos[]', files[i] )
    }

    console.log(formData.getAll('photos[]'));

  
  }

}
