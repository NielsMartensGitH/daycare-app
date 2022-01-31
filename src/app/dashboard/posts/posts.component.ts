import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$!: Posts[];
  currentId!: number; 

  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.dataStorage.getAllPosts().subscribe( 
      posts => {
        this.posts$ = posts
      })

  }

  onAddPost(posts: Posts[]) {
    this.dataStorage.addPost(posts).subscribe(
      () => {
        this.ngOnInit();
      })
  }

  deletePost(postId: number) {
   this.dataStorage.deletePost(postId).subscribe(
     () => this.ngOnInit()
   );   
  }

  setCurrentId(id: number): void {
    this.currentId = id;
  }

  

}
