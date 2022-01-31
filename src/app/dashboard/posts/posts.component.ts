import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';
import { PostsServiceService } from 'src/app/posts-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$!: Posts[];
  subscriptions!: Subscription;


  constructor(private dataStorage: DatastorageService, private postsService: PostsServiceService) { }

  ngOnInit() {

    this.dataStorage.fetchPosts()

    this.subscriptions = this.postsService.postsChanges.subscribe(
      (posts: Posts[]) => {
        this.posts$ = posts;
      }
    )

    this.posts$ = this.postsService.getPosts()
    // this.dataStorage.getAllPosts().subscribe( 
    //   posts => {
    //     this.posts$ = posts
    //     this.dataStorage.posts$ = posts;
    //   })



    // this.dataStorage.fetchPosts();
  }



  deletePost(postId: number) {
    console.log(this.dataStorage.posts$)
   this.dataStorage.deletePost(postId).subscribe(
     () => this.ngOnInit()
   );   
  }



}
