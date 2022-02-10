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
  curDaycare!: any;
  constructor() { }
 
  ngOnChanges() {
     {
      this.ngOnInit();
    }
  }

  ngOnInit() {

    this.curDaycare = sessionStorage.getItem('daycare_id');

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
      'daycare_id': this.curDaycare,
      'privacy': privacyValue
    }

    this.onSubmitted.emit(editedPost);
  }

}
