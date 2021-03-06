import { Component, OnInit, AfterViewInit , EventEmitter, Output, ViewChild } from '@angular/core';
import { Posts } from 'src/app/shared/model/posts.model';
import { DatastorageService } from 'src/app/datastorage.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FileuploadService } from 'src/app/fileupload.service';
import { Child } from 'src/app/shared/model/child.models';
import { Image } from 'src/app/shared/model/image.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent implements OnInit, AfterViewInit  {

  @ViewChild('editor') editor: any;
  @Output() onSubmitted = new EventEmitter();  // sends new message to method onSubmitted 
  // @Output() addFiles = new EventEmitter(); // NOT USED RIGHT NOW
  postsForm!: FormGroup; // Here we instantiate our postsForm for our formcontrol
  privacies: string[] = ["public", "private"]; // Possitble values for our select element where we choouse message privacy
  default = null;
  $posts!: Posts[];
  sendHTML: string
  edit: any

  images: Image[] = [];
  ImagesId: number[] = [] // postID of our newly created post which we will give to our EventEmitter
  

  
  curDaycare!: any;  // Currentdaycare id from our sessionstorage
  children$!: Child[]; // Here we will put all the children of the daycare which we can chose from in select element when adding private posts


  constructor(private dataStorage: DatastorageService, private uploadfile: FileuploadService, private fb: FormBuilder) {

  }

  // FOR THE CKEDITOR WE NEED TO ADD CLOUDSERVICE FOR IMAGES 
  ngAfterViewInit() {
    let editor = this.editor.elementRef.nativeElement;
    ClassicEditor.create(editor, {
      cloudServices: {
        tokenUrl: 'https://87138.cke-cs.com/token/dev/6b3d2130908f8e38937968d8d710487d962dfa113c438370e967aa30eb15?limit=10', // OUR FREE TOKEN 30DAYS TRIAL
        uploadUrl: 'https://87138.cke-cs.com/easyimage/upload/' // HERE THE IMAGES WILL BE STORED
      },
    } )
    .then(editor => {
      this.edit = editor
    
     
    }
    
    )
    .catch();

    
  }

  public getEditor() {

    console.log(this.editor.editorInstance)
  }

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
      'message': new FormControl(null),
      'photos': new FormControl(null)
    })

    // we set the validator to required if privacy is private in the 'setValidator' method!
    this.postsForm.get("privacy")?.valueChanges.subscribe(data => {
      this.setvalidator()
    })

  }





  // ADD POST

  addPost() {

    // GET DATA FROM THE CKEDITOR
    const message = this.edit.getData()

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

      // On file Select they will be pushed to our files array for uploading multiple files NOT USED RIGHT NOW!
    // onChange(event: any) {
    //   const files = event.target.files;
    //   this.addFiles.emit(files)
      
    // }

    // this method will set validator of child to required if in select element of 'privacy' the selected value is 'private' 
    setvalidator() {

      if (this.postsForm.controls["privacy"].value == "private") {
        this.postsForm.controls['child'].setValidators([Validators.required]);
      } else {
        this.postsForm.controls['child'].clearValidators();
      }
      this.postsForm.get('child')?.updateValueAndValidity()
    }

    

}
