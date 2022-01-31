import { Injectable } from '@angular/core';
import { Posts } from './shared/model/posts.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {

  postsChanges = new Subject<Posts[]>();
  private posts$!: Posts[]
  postUrl: string = "http://gameofcones.be/api/posts";

  constructor() { }

  setPosts(posts: Posts[]) {
    this.posts$ = posts;
    this.postsChanges.next(this.posts$.slice())
  }

  getPosts() {
    return this.posts$.slice();
  }

  

}
