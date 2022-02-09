import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-mb-content',
  templateUrl: './mb-content.component.html',
  styleUrls: ['./mb-content.component.css']
})
export class MbContentComponent implements OnInit {
  curParent!: any;
  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.curParent = sessionStorage.getItem('parentID');
    console.log(this.curParent);
    if(this.curParent != null){
      this.dataStorage.getChildrenParentsV2(this.curParent).subscribe(res => {
        console.log(res);
        console.log(this.curParent);
      });
    }
  }

}
