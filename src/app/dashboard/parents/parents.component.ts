import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Child } from 'src/app/shared/model/child.models';
import { Parent } from 'src/app/shared/model/parent.model';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css'],
  animations: [
    trigger('listAnimation', [
      
      transition('* => *', [
        query('enter', style({ opacity: 0 }), { optional: true}),

        query('enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75px)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0px)', offset: 1}),
          ]))
        ]), { optional: true})
      ])
    ])
  ]
})
export class ParentsComponent implements OnInit {
  parents$!:Parent[];
  isclicked:boolean = false;
  sureDelete:boolean = false;
  currentParent!:string;
  parentId: number = 1;
  editThisParent!: any;
  daycare_id!:any
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
      console.log(res)
    });
    

  }

  onEdit(edittedPar:Parent){
    this.dataStorage.updateParent(edittedPar).subscribe(() => this.ngOnInit())
  }
  
  onDeleteChild(child:Child){
    this.dataStorage.deleteChild(child).subscribe(() => this.ngOnInit())
  }
}
