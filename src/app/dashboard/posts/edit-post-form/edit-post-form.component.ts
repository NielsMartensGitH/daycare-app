import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.css']
})
export class EditPostFormComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter();
  @Input() message!: string;
  @Input() postId!: number;
  postsForm!: FormGroup;
  privacies: string[] = ["public", "private"];
  default = null;
  constructor() { }
 
  ngOnChanges() {
     {
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.postsForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'privacy': new FormControl(null, [Validators.required]),
      'message': new FormControl(null, [Validators.required])
    })

    
    // this.postsForm.statusChanges.subscribe(
    //   (status) => console.log(status)
    // )


    this.postsForm.patchValue({
      'message': this.message
    })


  }

  editPost(message: string) {
    
    
    const privacy = this.postsForm.controls["privacy"].value

    const privacyValue = privacy == "private" ? 1 : 0

    const editedPost =  {
      'id': this.postId,
      'type_id': 1,
      'picture': "",
      'message': message,
      'daycare_id': 1,
      'privacy': privacyValue
    }

    this.onSubmitted.emit(editedPost);
  }

}
