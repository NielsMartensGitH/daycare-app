import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root' 
})
export class FileuploadService {

  base64textString: string[] = [];

  constructor(private http: HttpClient) { }


  upload(files: any) {

    if(files) {

      files.forEach(
        (file: any) => {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);

      })

    }
  
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
           this.base64textString.push(btoa(binaryString))
           console.log(btoa(binaryString));
   }

}
