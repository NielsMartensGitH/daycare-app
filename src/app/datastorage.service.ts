import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Posts } from './shared/model/posts.model';
import { Parent } from './shared/model/parent.model';
import { PostsServiceService } from './posts-service.service';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {
  url: string = "http://gameofcones.be/api/";
  parentUrl: string = "http://gameofcones.be/api/parents";
  postUrl: string = "http://gameofcones.be/api/posts";
  posts$!: Posts[]
  constructor(private http: HttpClient, private postsService: PostsServiceService) { 
  }
  
  // ===================== POST METHODS =============================

  fetchPosts() {
    return this.http.get<Posts[]>(this.url + 'posts').pipe(
      tap(posts => {
        this.postsService.setPosts(posts)
      })
    ).subscribe()

  }

  addPost(newPost: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.postUrl, newPost, {headers: headers});    
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.postUrl + '/' + id, {responseType: 'text'});
  }


 // ===================== PARENT METHODS =============================

  getAllParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.url + 'parents').pipe()
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
    return this.http.get<any>(this.url + 'childparent/' + id).pipe()
  }

  addChild(child: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.url + 'children', child, {headers: headers});
  }


}

