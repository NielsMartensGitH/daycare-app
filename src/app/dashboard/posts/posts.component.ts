import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$!: Posts[];


  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.dataStorage.getAllPosts().subscribe(
      
      posts => {
        this.posts$ = posts
        this.dataStorage.posts$ = posts;
      })

  }



  deletePost(postId: number) {
    console.log(this.dataStorage.posts$)
   this.dataStorage.deletePost(postId).subscribe(
     () => this.ngOnInit()
   );   
  }



}
