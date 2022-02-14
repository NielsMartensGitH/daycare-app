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


  // ===================== ALL METHODS WITH DAYCARE ENDPOINTS ====================


    // FETCH THE INFORMATION OF ONE DAYCARE
  getDaycareById(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'daycares/' + id)
  }

     // FETCH ONLY THE NAME OF A SPECIFIC DAYCARE
  getDaycareName(id: number) {
    return this.http.get<any>(this.url + 'daycarename/' + id);
  }

     // CREATES A NEW DAYCARE AFTER REGISTRATION
  addDaycare(newDaycare: any) :Observable<any>{
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + 'daycares', newDaycare, {headers: headers});
  }

  // ============= METHOD FOR SHOWING CHILDREN OF PARENTS ====================

    // FETCH ALL CHILDREN OF A SPECIFIC PARENT
  getChildParents(id:any): Observable<any> {
    return this.http.get<any>(this.url + 'children/' + id).pipe()
  }

  
  // ============== ALL METHODS FOR POSTS =================

    // FETCH ALL POSTS WITH DAYCARE INFO ADDED TO EACH POST
  getAllPosts(): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.url + 'posts').pipe()

  }

    // FETCH ONLY THE POSTS THAT ARE WRITTEN BY A SPECIFIC DAYCARE
  getPostsByDayCare(id: number): Observable<Posts[]> {
    return this.http.get<Posts[]>(this.url + 'daycareposts/' + id)
  }

    // ADDS A POST 
  addPost(newPost: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.postUrl, newPost, {headers: headers});    
  }

    // DELETES A POST
  deletePost(id: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.delete(this.postUrl + '/' + id, {responseType: 'text'});
  }

    // EDITS A POST
  updatePost(updatedPost: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.put(this.url + 'posts/' + id, updatedPost, {headers: headers});
  }

    // SHOWS EVERY POSTS OF A SPECIFIC CHILD (private posts that only specific parent can see) AND A SPECIFIC DAYCARE (public posts)
  getMessageboardPost(childID:any, daycareID:any): Observable<any>{
    return this.http.get<any>(this.url + "posts/search/" + daycareID + "/" + childID);
  }

  // ============= ALL METHODS FOR POSTCOMMENTS ================

     // FETCH ALL THE COMMENTS OF A SPECIFIC POSTS INCLUDING THE PARENTS AND DAYCARE COMMENTS
  getCommentsbyPostId(id: number): Observable<any> {
    return this.http.get(this.url + 'comments/' + id ).pipe();
  }

    // ADD A COMMENT
  addComment(newComment: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + 'comments', newComment, {headers: headers});    
  }

    // DELETE A COMMENT
  deleteComment(id: number): Observable<any> {
    return this.http.delete(this.url + 'comments/' + id, {responseType: 'text'});
  }

    // EDIT A COMMENT
  updateComment(updatedComment: any, id: number): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.put(this.url + 'comments/' + id, updatedComment, {headers: headers});
  }

  // ++++++++++ ALL METHODS FOR PARENTS ================

    // SHOWS EVERY PARENT
  getAllParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.url + 'parents').pipe();
  }

     // ADDS A PARENT
  addParent(parent: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.parentUrl, parent, {headers: headers});
  }

    // DELETES A PARENT
  deleteParent(parent: Parent): Observable<any> {

    const url = `${this.parentUrl}/${parent.id}`;
    return this.http.delete(url, {responseType: 'text'});
  }

    // UPDATES A SPECIFIC PARENT
  updateParent(parent: Parent): Observable<Parent> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    const url = `${this.parentUrl}/${parent.id}`;
    return this.http.put<Parent>(url, parent, {headers: headers});
  }

    // GETS EVERY POSTS A PARENT MAY SEE INCLUDES THE POSTS OF THEIR CHILD AND THE POSTS THAT ARE PUBLIC FOR EVERY DAYCARE PARENT
  getPostsbyParent(parentId: number, daycareId: number): Observable<any>{
    return this.http.get<any>(this.url + "parentposts/" + parentId + "/" + daycareId);
  }

  // =============== ALL METHODS FOR CHILDREN ===================


    // SHOW ALL THE CHILDREN FROM EVERY DAYCARE
  getAllChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(this.url + 'children').pipe();
  }

     // ADDS A CHILD
  addChild(child: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + 'children', child, {headers: headers});
  }

     // GET ALL THE CHILDREN OF A SPECIFIC DAYCARE
  getAllChildrenByDaycare(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'daycarechildren/' + id).pipe();
  }

    // GET A SPECIFIC CHILD BY THEIR ID
  getChildById(id: number): Observable<any> {
    return this.http.get<any>(this.url + 'children/child/' + id)
  }

    // DELETE A CHILD
  deleteChild(child: Child): Observable<any> {
    const url = `${this.url}children/${child.id}`;
    return this.http.delete(url, {responseType: 'text'});
  }

  // TOGGLE CHILD CHECKED IN/CHECKED OUT
  updateChildCheckedIn(child:Child): Observable<Child> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    const url = `${this.url}children/${child.id}`;
    return this.http.put<Child>(url, child, {headers: headers});
  }


  // =============== ALL METHODS FOR DIARIES ===================
  
    // FETCH ALL THE DIARIES
  getAllDiaries(): Observable<any> {
    return this.http.get<any>(this.url + 'diaries').pipe();
  }

    // DELETES A DIARY
  deleteDiary(id: number): Observable<any> {
    return this.http.delete(this.url + 'diaries/' + id, {responseType: 'text'});
  }

    // ADDS A DIARY
  addDiary(newDiary: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + "diaries", newDiary, {headers: headers});    
  }


// ================ ALL METHODS FOR DIARYCOMMENTS ===============


  // FETCH EVERY COMMENT BY A SPECIFIC DIARY
getDiaryCommentsbyDiaryId(id: number): Observable<any> {
  return this.http.get(this.url + 'diarycomments/' + id ).pipe();
}

  // DELETE A DIARY COMMENT
deleteDiaryComment(id: number): Observable<any> {
  return this.http.delete(this.url + 'diarycomments/' + id, {responseType: 'text'});
}

  // EDIT A DIARY COMMENT
updateDiaryComment(updatedComment: any, id: number): Observable<any> {
  const headers = new HttpHeaders().set("Content-type", "application/json");
  return this.http.put(this.url + 'diarycomments/' + id, updatedComment, {headers: headers});
}

  // POSTS A DIARY COMMENT
addDiaryComment(newComment: any): Observable<any> {
  const headers = new HttpHeaders().set("Content-type", "application/json");
  return this.http.post(this.url + 'diarycomments', newComment, {headers: headers});    
}

  // GET DIARIES OF SPECIFIC CHILDREN

getChildDiaries(id: number): Observable<any> {
  return this.http.get(this.url + 'diaries/' + id ).pipe();

}
 

// =============== ALL METHODS FOR EVENTS =====================


  // FETCH EVERY EVENT
getAllEvents(): Observable<any> {
  return this.http.get<any>(this.url + 'events').pipe();
}

  // ADD AN EVENT
addEvent(event: any): Observable<any> {
  const headers = new HttpHeaders().set("Content-type", "application/json");
  return this.http.post(this.url + "events", event, {headers: headers});    

}

   // FETCH ALL THE EVENTS OF A SPECIFIC DAYCARE
getEventsByDaycareId(daycare_id:number): Observable<any> {
  return this.http.get<any>(this.url + 'events/' + daycare_id)
}

// ====================== ALL METHODS FOR AUTHORIZATION ========================

  //this is to search the parent through the provided email
  loginsearch(email: any):Observable<any>{
    return this.http.get<any>(this.url + 'parents/search/' + email);
  }

  //search for the daycare with the provided email
  daycareloginsearch(email: any): Observable<any>{
    return this.http.get<any>(this.url + 'daycares/search/' + email);
  }

 

 
  




 

 

 
}

