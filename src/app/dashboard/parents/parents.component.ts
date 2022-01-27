import { Component, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
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
    alert("Would you like to add a new parent?")
  }

}
