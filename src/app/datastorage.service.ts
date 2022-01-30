import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from './shared/model/posts.model';
import { Parent } from './shared/model/parent.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {
  url: string = "http://gameofcones.be/api/";
  parentUrl: string = "http://gameofcones.be/api/parents";
  postUrl: string = "";
  constructor(private http: HttpClient) { 
    this.postUrl = "http://gameofcones.be/api/posts";
  }
  
  getAllPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.url + 'posts').pipe()

  }

  addPost(newPost: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.postUrl, newPost, {headers: headers});    
  }

  getAllParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.url + 'parents').pipe()
  }

  addParent(parent: Parent): Observable<Parent> {
    return this.http.post<Parent>(this.parentUrl, parent, httpOptions);
  }

}

