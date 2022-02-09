import { Component, HostBinding, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {
  children$!: Child[];
  childId!: number;
  diary = "Diary"
  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.dataStorage.getAllChildren().subscribe(children => this.children$ = children)
  }

  onDelete(child:Child){
    this.dataStorage.deleteChild(child).subscribe(() => this.ngOnInit());
  }

  onDiaryAdd(newDiary:any){
     this.dataStorage.addDiary(newDiary).subscribe(() => this.ngOnInit());
  }



  onDblClick(child:Child){
    setTimeout(() => {
    if(child.checked_in == 0){
      child.checked_in = 1;
      this.dataStorage.updateChildCheckedIn(child).subscribe(() => this.ngOnInit());
      console.log(child)
    }
    else{
      child.checked_in = 0;
      this.dataStorage.updateChildCheckedIn(child).subscribe(() => this.ngOnInit());
      console.log(child)
    }
    }, 500)
  }

  onBtnChange(idChild:number){
    if(idChild === this.childId)
     this.diary = "Done"
  }
}
