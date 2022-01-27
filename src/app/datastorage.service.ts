import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from './shared/model/posts.model';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {
  url: string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  
  getAllPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.url + 'posts').pipe()

  }

}

