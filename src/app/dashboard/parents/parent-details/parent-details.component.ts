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
  @Input() detail!: number; //parent id 
  addChildClicked:boolean = false; //to toggle open/close button
  childparents$:any; 
  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.dataStorage.getChildParents(this.detail).subscribe(childparents => this.childparents$ = childparents)
  }

  addChild(newChild:Child){
    this.addedChild.emit(newChild);

    //AFTER THE BABY IS EMITTED TO THE PARENTS AND ADDED TO THE SERVER, INVOKE THE
    //NGONINIT TO SHOW THAT BABY
    setTimeout(() =>{
    this.ngOnInit();
  },1000)
  }

  
  //WHEN A NEW PARENT IS PASSED DOWN TO THE CHILD COMP FROM THE PARENT COMP
  //FETCH A NEW PARENT WITH THE PASSED IN ID
  ngOnChanges() {
    {
      this.dataStorage.getChildParents(this.detail).subscribe(childparents => this.childparents$ = childparents)
    }
 }
  
  
}
