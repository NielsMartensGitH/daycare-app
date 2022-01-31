import { Component, OnInit, Input } from '@angular/core';
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

  ngOnInit() {
    console.log(this.message)
    this.postsForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'privacy': new FormControl(null, [Validators.required]),
      'message': new FormControl(null, [Validators.required])
    })

    
    this.postsForm.statusChanges.subscribe(
      (status) => console.log(status)
    )


    this.postsForm.patchValue({
      'message': this.message
    })
  }

}
