import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-parent-add',
  templateUrl: './parent-add.component.html',
  styleUrls: ['./parent-add.component.css']
})
export class ParentAddComponent implements OnInit {
  @Output() onSubmitted = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }

  onClicked() {
    this.onSubmitted.emit()
  }
}
