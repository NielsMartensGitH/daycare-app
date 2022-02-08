import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from './shared/model/posts.model';
import { Parent } from './shared/model/parent.model';
import { Child } from './shared/model/child.models';
import { Daycare } from 'src/app/shared/model/daycare.model'

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

  updatePost(updatedPost: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.put(this.url + 'posts/' + id, updatedPost, {headers: headers});
  }

  addComment(newComment: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + 'comments', newComment, {headers: headers});    
  }

  deletePost(id: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.delete(this.postUrl + '/' + id, {responseType: 'text'});
  }

  getCommentsbyPostId(id: number): Observable<any> {
    return this.http.get(this.url + 'comments/' + id ).pipe();
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(this.url + 'comments/' + id, {responseType: 'text'});
  }

  updateComment(updatedComment: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.put(this.url + 'comments/' + id, updatedComment, {headers: headers});
  }

  getAllParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.url + 'parents').pipe();
  }

  addParent(parent: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.parentUrl, parent, {headers: headers});
  }

  

  deleteParent(parent: Parent): Observable<any> {

    const url = `${this.parentUrl}/${parent.id}`;
    return this.http.delete(url, {responseType: 'text'});
  }

  getChildParents(id:any): Observable<any> {
    return this.http.get<any>(this.url + 'children/' + id).pipe()
  }

  addChild(child: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + 'children', child, {headers: headers});
  }

  updateParent(parent: Parent): Observable<Parent> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    const url = `${this.parentUrl}/${parent.id}`;
    return this.http.put<Parent>(url, parent, {headers: headers});
  }

  getAllChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(this.url + 'children').pipe();
  }

  deleteChild(child: Child): Observable<any> {
    const url = `${this.url}children/${child.id}`;
    return this.http.delete(url, {responseType: 'text'});
  }

  //the idk section
  loginsearch(email: any):Observable<any>{
    return this.http.get<any>(this.url + 'parents/search/' + email);
  }

  addDaycare(newDaycare: any) :Observable<any>{
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + 'daycares', newDaycare, {headers: headers});
  }

  getAllDiaries(): Observable<any> {
    return this.http.get<any>(this.url + 'diaries').pipe();
  }

  addDiary(newDiary: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + "diaries", newDiary, {headers: headers});    
  }

 addDiaryComment(newComment: any): Observable<any> {
  const headers = new HttpHeaders().set("Content-type", "application/json");
  return this.http.post(this.url + 'diarycomments', newComment, {headers: headers});    
}


  getDiaryCommentsbyDiaryId(id: number): Observable<any> {
    return this.http.get(this.url + 'diarycomments/' + id ).pipe();
  }



  deleteDiaryComment(id: number): Observable<any> {
    return this.http.delete(this.url + 'diarycomments/' + id, {responseType: 'text'});
  }

  updateDiaryComment(updatedComment: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.put(this.url + 'diarycomments/' + id, updatedComment, {headers: headers});
  }

  daycareloginsearch(email: any): Observable<any>{
    return this.http.get<any>(this.url + 'daycares/search/' + email);
  }
}

