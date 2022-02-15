import { Component, Input, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';
import { MbDiariesComponent } from'src/app/messageboard/mb-diaries/mb-diaries.component';

@Component({
  selector: 'app-mb-addchildren',
  templateUrl: './mb-addchildren.component.html',
  styleUrls: ['./mb-addchildren.component.css']
})
export class MbAddchildrenComponent implements OnInit {
  @Input() parentId!:number;
  parent_id = sessionStorage.getItem('parentID')
  childparents$!:Child[];
  curchild!: any;
  constructor(private dataStorage:DatastorageService, private changechild: MbDiariesComponent) { }

  ngOnInit(): void {
    this.dataStorage.getChildParents(this.parent_id).subscribe(childparents => {this.childparents$ = childparents
      this.curchild = childparents[0];
      console.log(childparents)
    })
  }
  ngOnChange(){
    this.ngOnInit();
  }

  addChildId(child: any) {
    sessionStorage.setItem('ChildId', child);
    this.changechild.setchild(child);
    console.log("send" + child)
  }

  // showInfochild(selectedchild:any){
  //   this.curchild = selectedchild;
  //   console.log(this.curchild);
  // }

}
