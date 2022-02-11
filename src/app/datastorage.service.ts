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

  getPostsByDayCare(id: number): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.url + 'daycareposts/' + id)
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

  getAllChildrenByDaycare(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'daycarechildren/' + id).pipe();
  }

  addChild(child: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + 'children', child, {headers: headers});
  }

  updateChildCheckedIn(child:Child): Observable<Child> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    const url = `${this.url}children/${child.id}`;
    return this.http.put<Child>(url, child, {headers: headers});
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

  //this is to search the parent through the provided email
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

  deleteDiary(id: number): Observable<any> {
    return this.http.delete(this.url + 'diaries/' + id, {responseType: 'text'});
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
  //search for the daycare with the provided email
  daycareloginsearch(email: any): Observable<any>{
    return this.http.get<any>(this.url + 'daycares/search/' + email);
  }

  getDaycareName(id: number) {
    return this.http.get<any>(this.url + 'daycarename/' + id);
  }

  getAllEvents(): Observable<any> {
    return this.http.get<any>(this.url + 'events').pipe();
  }

  getEventsByDaycareId(daycare_id:number): Observable<any> {
    return this.http.get<any>(this.url + 'events/' + daycare_id)
  }

  addEvent(event: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + "events", event, {headers: headers});    

  }

  getDaycareById(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'daycares/' + id)
  }

  getMessageboardPost(childID:any, daycareID:any): Observable<any>{
    return this.http.get<any>(this.url + "posts/search/" + daycareID + "/" + childID);
  }

  getPostsbyParent(parentId: number, daycareId: number): Observable<any>{
    return this.http.get<any>(this.url + "parentposts/" + parentId + "/" + daycareId);
  }
}

