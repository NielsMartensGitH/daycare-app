import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.css']
})
export class EditPostFormComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter(); // When submitting edited message 
  @Input() message!: string; // Here we catch our message from our parents PostsComponent
  @Input() postId!: number; // Here we catch our message id from our parent postscomponent
  postsForm!: FormGroup; // Here we instantiate our postsForm for our formcontrol
  privacies: string[] = ["public", "private"]; // Possitble values for our select element where we choouse message privacy
  default = null; 
  curDaycare!: any; // Currentdaycare id from our sessionstorage
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


  }

  // sending our new object with messagedata to our parent
  editPost(message: string) {
    
    
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
