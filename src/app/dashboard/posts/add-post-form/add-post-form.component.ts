import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent implements OnInit {

  postsForm!: FormGroup;
  privacies: string[] = ["public", "private"];
  default = null;
  $posts!: Posts[];

  constructor(private dataStorage: DatastorageService) { }

  ngOnInit() {

    this.postsForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'privacy': new FormControl(null, [Validators.required]),
      'message': new FormControl(null, [Validators.required])
    })

    
    this.postsForm.statusChanges.subscribe(
      (status) => console.log(status)
    )
  }

  addPost(privacy: number, message: string) {

    const time = new Date();
    console.log(time.toLocaleString())

    const newPost = {
      'id': null,
      'type_id': 1,
      'picture': "",
      'message': message,
      'daycare_id': 1,
      'privacy': privacy
    }

    this.dataStorage.addPost(newPost).subscribe(
      () => this.ngOnInit()
    );

  }

  clearForm() {
    this.postsForm.reset();
  }


  
}
