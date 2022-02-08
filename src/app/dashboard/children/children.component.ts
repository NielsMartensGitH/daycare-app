import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {
  children$!: Child[];
  childId!: any;
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

  onDiary(child:Child){
    this.childId = JSON.stringify(child);
  }

}
