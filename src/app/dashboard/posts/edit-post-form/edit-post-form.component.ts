import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-post-form',
  templateUrl: './edit-post-form.component.html',
  styleUrls: ['./edit-post-form.component.css']
})
export class EditPostFormComponent implements OnInit {
  @Input() message!: string;
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

}
