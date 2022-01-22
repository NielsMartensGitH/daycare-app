import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageboardComponent } from './messageboard/messageboard.component';
import { AppRouterModule } from './routing.module';
import { FeedsComponent } from './messageboard/feeds/feeds.component';
import { TopnavbarComponent } from './dashboard/topnavbar/topnavbar.component';
import { SidenavbarComponent } from './dashboard/sidenavbar/sidenavbar.component';
import { ChildrenComponent } from './dashboard/children/children.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { PostsComponent } from './dashboard/posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessageboardComponent,
    FeedsComponent,
    TopnavbarComponent,
    SidenavbarComponent,
    ChildrenComponent,
    EmployeesComponent,
    CalendarComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
