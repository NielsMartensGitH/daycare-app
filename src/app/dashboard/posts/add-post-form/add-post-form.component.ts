import { Component, OnInit, EventEmitter, Output, ComponentFactoryResolver } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FileuploadService } from 'src/app/fileupload.service';
import { Child } from 'src/app/shared/model/child.models';
import { Image } from 'src/app/shared/model/image.model';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter();  // sends new message to method onSubmitted 
  @Output() addFiles = new EventEmitter();
  postsForm!: FormGroup; // Here we instantiate our postsForm for our formcontrol
  privacies: string[] = ["public", "private"]; // Possitble values for our select element where we choouse message privacy
  default = null;
  $posts!: Posts[]; 

  images: Image[] = [];
  ImagesId: number[] = [] // postID of our newly created post which we will give to our EventEmitter
  

  
  curDaycare!: any;  // Currentdaycare id from our sessionstorage
  children$!: Child[]; // Here we will put all the children of the daycare which we can chose from in select element when adding private posts


  constructor(private dataStorage: DatastorageService, private uploadfile: FileuploadService, private fb: FormBuilder) {}

  ngOnInit() {

    this.curDaycare = sessionStorage.getItem('daycare_id');

    this.dataStorage.getAllChildrenByDaycare(this.curDaycare).subscribe(data => {
      this.children$ = data;
    })



      // make input of our forms required !! PHOTOS is NOT required , child is ONLY REQUIRED WHEN CHOOSING PRIVACY "PRIVATE" in select element
    this.postsForm = this.fb.group({
      'title': new FormControl(null, [Validators.required]),
      'privacy': new FormControl(null, [Validators.required]),
      'child': new FormControl(""),
      'message': new FormControl(null, [Validators.required]),
      'photos': new FormControl(null)
    })

    // we set the validator to required if privacy is private in the 'setValidator' method!
    this.postsForm.get("privacy")?.valueChanges.subscribe(data => {
      this.setvalidator()
    })

  }


  // ADD POST

  addPost(message: string) {

  const privacy = this.postsForm.controls["privacy"].value; // we store the selected value of our 'privacy' select element here in a variable
  const child = this.postsForm.controls["child"].value; // we store the selected value of our 'child' select element here in a variable
    
  const privacyValue = privacy == "private" ? 1 : 0 // we want to change the value private to 1 or when public to 0
  const newPost = {
    'id': null,
    'type_id': 1,
    'picture': "",
    'message': message,
    'daycare_id': this.curDaycare,
    'privacy': privacyValue,
    'child_id': !child ? null : child
  }
    

    // we send the newPost to our parent component 'PostsComponent' via the EventEmitter

    this.onSubmitted.emit(newPost)

    // when post is added all form values should be made empty with 'clearForm'     
    this.clearForm();
  }

  // for clearing our form values
  clearForm() {
    this.postsForm.reset();
  }

      // On file Select they will be pushed to our files array for uploading multiple files
    onChange(event: any) {
      const files = event.target.files;
      console.log(files)
      this.addFiles.emit(files)
      
    }

    // this method will set validator of child to required if in select element of 'privacy' the selected value is 'private' 
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
