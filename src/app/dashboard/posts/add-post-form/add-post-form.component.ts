import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FileuploadService } from 'src/app/fileupload.service';
import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter();
  postsForm!: FormGroup;
  privacies: string[] = ["public", "private"];
  default = null;
  $posts!: Posts[];
  files: File[] = [];
  curDaycare!: any;
  children$!: Child[];

  constructor(private dataStorage: DatastorageService, private uploadfile: FileuploadService, private fb: FormBuilder) {

    
   }

  ngOnInit() {

    this.curDaycare = sessionStorage.getItem('daycare_id');

    this.dataStorage.getAllChildrenByDaycare(this.curDaycare).subscribe(data => {
      this.children$ = data;
    })

    this.postsForm = this.fb.group({
      'title': new FormControl(null, [Validators.required]),
      'privacy': new FormControl(null, [Validators.required]),
      'child': new FormControl(""),
      'message': new FormControl(null, [Validators.required]),
      'photos': new FormControl(null)
    })

    this.postsForm.get("privacy")?.valueChanges.subscribe(data => {
      this.setvalidator()
    })

    

    
    // this.postsForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // )

  }


  addPost(message: string) {

  const privacy = this.postsForm.controls["privacy"].value;
  const child = this.postsForm.controls["child"].value;

  const privacyValue = privacy == "private" ? 1 : 0
    const newPost = {
      'id': null,
      'type_id': 1,
      'picture': "",
      'message': message,
      'daycare_id': this.curDaycare,
      'privacy': privacyValue,
      'child_id': child
    }

    this.uploadfile.upload(this.files);
    
    
    this.clearForm();
    // this.dataStorage.addPost(newPost).subscribe();
    this.onSubmitted.emit(newPost)

  }

  clearForm() {
    this.postsForm.reset();
  }

      // On file Select
      onChange(event: any) {
        const files_object = event.target.files;
        Object.values(files_object).forEach(
          (val: any) => {
          this.files.push(val);
        });
    }

    setvalidator() {

      if (this.postsForm.controls["privacy"].value == "private") {
        this.postsForm.controls['child'].setValidators([Validators.required]);
        console.log(this.postsForm)
      } else {
        this.postsForm.controls['child'].clearValidators();
        console.log(this.postsForm)
      }
      this.postsForm.get('child')?.updateValueAndValidity()
    }

}
