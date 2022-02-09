import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-mb-content',
  templateUrl: './mb-content.component.html',
  styleUrls: ['./mb-content.component.css']
})
export class MbContentComponent implements OnInit {
  curParent!: any;
  childids!: any[];
  posts!: any[];
  curDaycare!: any;
  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.childids =[];
    this.posts =[];
    this.curParent = sessionStorage.getItem('parentID');
    this.curDaycare = sessionStorage.getItem('linkedDaycareParent');
    
    if(this.curParent != null){
      
      this.dataStorage.getChildParents(this.curParent).subscribe(res => {
        console.log(res);
        for(let i =0; i<res.length;i++){
          this.childids+=res[i].id;
        }
        console.log(this.childids[0])
        if(this.childids.length !=0){
          this.dataStorage.getMessageboardPost(this.childids[0],this.curDaycare).subscribe(res=>{
            for(let i=0;i<res.length; i++){
              this.posts.push(res[i]);
            }
            console.log(res)
          })
        }
        
      });
      
    }
    
  }

}
