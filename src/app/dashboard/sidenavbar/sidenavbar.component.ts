import { Component, OnInit } from '@angular/core';
import { DatastorageService } from 'src/app/datastorage.service';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  curDaycare!: any;
  daycareName!: string;

  constructor(private dataStorage: DatastorageService) { }

  ngOnInit()  {
    this.curDaycare = sessionStorage.getItem('daycare_id');
    this.dataStorage.getDaycareName(this.curDaycare).subscribe(
      data => {
        this.daycareName = data[0].name;
      }
    )
  }

}
