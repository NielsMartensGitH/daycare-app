import { Component, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { DatastorageService } from 'src/app/datastorage.service';
import { Parent } from 'src/app/shared/model/parent.model';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {
  parents$!:Parent[];
  isclicked:boolean = false;
  childparents$:any;
  sureDelete:boolean = false;
  currentParent!:string;
  constructor(private dataStorage: DatastorageService) { }

  ngOnInit(): void {
    this.dataStorage.getAllParents().subscribe(parents => this.parents$ = parents)
  }

  /*onActiveOutlet(component: Component) {
    let previousUrl = this.router.url;
        this.router.events.subscribe(
          event => {
            if (event instanceof NavigationEnd) {
              if (previousUrl != this.router.url && previousUrl.includes(this.router.url)) {
                this.outlet.deactivate();
              }
            }
        }
    )
}*/

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
      console.log(this.sureDelete);
      this.sureDelete = false;
        }
        else {
          console.log(this.sureDelete)
        }
     }
    
      , 4000); 
     
    
  }


  onSeeDetails(parentId:number){
    this.dataStorage.getChildParents(parentId).subscribe(childparents => this.childparents$ = childparents)
  }
  

}
