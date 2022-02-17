import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.css']
})
export class EditPostFormComponent implements OnInit {
  @ViewChild('editor') editor: any;
  @Output() onSubmitted = new EventEmitter(); // When submitting edited message 
  @Input() message!: string; // Here we catch our message from our parents PostsComponent
  @Input() postId!: number; // Here we catch our message id from our parent postscomponent
  postsForm!: FormGroup; // Here we instantiate our postsForm for our formcontrol
  privacies: string[] = ["public", "private"]; // Possitble values for our select element where we choouse message privacy
  default = null; 
  curDaycare!: any; // Currentdaycare id from our sessionstorage
  sendHTML: string
  edit: any
  constructor() { }
 
  ngOnChanges() {
     {
      this.ngOnInit();
    }
  }

  ngOnInit() {

    

    this.curDaycare = sessionStorage.getItem('daycare_id');

    // make input of our forms required
    this.postsForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),  
      'privacy': new FormControl(null, [Validators.required]), 
      'message': new FormControl(null, [Validators.required]) 
    })

   
    // adding original message to our form 
    this.postsForm.patchValue({
      'message': this.message
    })

    this.edit.setData(this.message)
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

  // sending our new object with messagedata to our parent
  editPost() {
    
     // GET DATA FROM THE CKEDITOR
     const message = this.edit.getData()
    
    const privacy = this.postsForm.controls["privacy"].value

    const privacyValue = privacy == "private" ? 1 : 0 // we want to change the value private to 1 or when public to 0

    const editedPost =  {
      'id': this.postId,
      'type_id': 1,
      'picture': "",
      'message': message,
      'daycare_id': this.curDaycare,
      'privacy': privacyValue
    }

    this.onSubmitted.emit(editedPost);
  }

}
