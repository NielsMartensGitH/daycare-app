import { Component, Input, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';

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
  constructor(private dataStorage:DatastorageService) { }

  ngOnInit(): void {
    this.dataStorage.getChildParents(this.parent_id).subscribe(childparents => {this.childparents$ = childparents
      this.curchild = childparents[0];
    })
  }
  ngOnChange(){
    this.ngOnInit();
  }

  showInfochild(selectedchild:any){
    this.curchild = selectedchild;
    console.log(this.curchild);
  }

}
