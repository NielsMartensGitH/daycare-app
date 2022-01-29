import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts$!: Posts[];
  postsForm!: FormGroup;
  privacies: string[] = ["public", "private"]

  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.dataStorage.getAllPosts().subscribe(posts => this.posts$ = posts)

    this.postsForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'privacy': new FormControl(null, [Validators.required]),
      'message': new FormControl(null, [Validators.required])
    })

    this.postsForm.statusChanges.subscribe(
      (status) => console.log(status)
    )
  }

  onSubmit() {
    this.postsForm.reset();
  }

}
