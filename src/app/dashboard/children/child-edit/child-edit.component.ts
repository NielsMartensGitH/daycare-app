import { Component, Input, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-child-edit',
  templateUrl: './child-edit.component.html',
  styleUrls: ['./child-edit.component.css']
})
export class ChildEditComponent implements OnInit {
  @Input() child_id!:Child;
  child$!:Child;
  constructor(private dataStorage:DatastorageService) { }

  ngOnChange(){
    this.ngOnInit()
  }

  ngOnInit(): void {
   // this.dataStorage.getChildById(this.child_id).subscribe(child => this.child$ = child)
   
  }

}
