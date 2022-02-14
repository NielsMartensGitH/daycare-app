import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';
import { Daycare } from 'src/app/shared/model/daycare.model';

@Component({
  selector: 'app-mb-mydaycare',
  templateUrl: './mb-mydaycare.component.html',
  styleUrls: ['./mb-mydaycare.component.css']
})
export class MbMydaycareComponent implements OnInit {


  daycareId!: any
  daycareInfo$!: Daycare[]

  constructor(private dataStorage: DatastorageService) { }

  ngOnInit() {
    this.daycareId = sessionStorage.getItem("linkedDaycareParent");

  
      this.dataStorage.getDaycareById(this.daycareId).subscribe(data => {
        this.daycareInfo$ = data;
      })
    
    
  }

}
