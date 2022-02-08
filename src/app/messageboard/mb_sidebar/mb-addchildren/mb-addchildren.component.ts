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
  childparents$!:Child[];
  constructor(private dataStorage:DatastorageService) { }

  ngOnInit(): void {
    this.dataStorage.getChildParents(this.parentId).subscribe(childparents => this.childparents$ = childparents)
  }
  ngOnChange(){
    this.ngOnInit();
  }

}
