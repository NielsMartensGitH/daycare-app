import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';
import { Parent } from 'src/app/shared/model/parent.model';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css'],
  
})
export class ParentsComponent implements OnInit {
  parents$!:Parent[];
  isclicked:boolean = false;
  sureDelete:boolean = false;
  currentParent!:string;
  parentId: number = 1;
  editThisParent!: any;
  daycare_id!:any;
  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.daycare_id = sessionStorage.getItem('daycare_id')
    this.dataStorage.getAllParentsByDaycare(this.daycare_id).subscribe(parents => this.parents$ = parents);
    
  }

  onClick() {
    this.isclicked = !this.isclicked
  }

  onAddParent(parent:Parent){


    this.dataStorage.addParent(parent).subscribe(() => this.ngOnInit());

    console.log(this.parents$)
    

  }

  onDelete(parent:Parent){
    this.currentParent = `${parent.firstname} ${parent.lastname}`;
      setTimeout(() => {
        if (this.sureDelete){
          this.dataStorage.deleteParent(parent).subscribe(() => this.ngOnInit());
          
          this.sureDelete = false;
          console.log(this.sureDelete);
        }
        else {
          console.log(this.sureDelete);
        }
     
      }, 5000)
    
  }



  onAddChild(child:Child){


    this.dataStorage.addChild(child).subscribe((res)=> {
      console.log(res); 
      console.log(child.parent_id);
      this.dataStorage.addParentAndChild(JSON.stringify({child_id:res, parent_id:child.parent_id})).subscribe(() => this.ngOnInit())
      
    });
    

  }

  onEdit(edittedPar:Parent){
    this.dataStorage.updateParent(edittedPar).subscribe(() => this.ngOnInit())
  }
  
  onDeleteChild(child:Child){
    this.dataStorage.deleteChild(child).subscribe(() => this.ngOnInit())
  }
}
