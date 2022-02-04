import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.css']
})
export class ParentDetailsComponent implements OnInit {
  @Output() addedChild = new EventEmitter<Child>();
  @Input() detail!: number;
  addChildClicked:boolean = false;
  childparents$:any;
  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.dataStorage.getChildParents(this.detail).subscribe(childparents => this.childparents$ = childparents)
  }

  addChild(newChild:Child){
    this.addedChild.emit(newChild)
  }

  ngOnChanges() {
    {
      this.dataStorage.getChildParents(this.detail).subscribe(childparents => this.childparents$ = childparents)
    }
 }
  onSaveChanges(){
    this.ngOnInit();
  }
  
}
