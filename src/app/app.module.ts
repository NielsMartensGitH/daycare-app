import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageboardComponent } from './messageboard/messageboard.component';
import { AppRouterModule } from './routing.module';
import { TopnavbarComponent } from './dashboard/topnavbar/topnavbar.component';
import { SidenavbarComponent } from './dashboard/sidenavbar/sidenavbar.component';
import { ChildrenComponent } from './dashboard/children/children.component';
import { ParentsComponent } from './dashboard/parents/parents.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { MbNavbarComponent } from './messageboard/mb-navbar/mb-navbar.component';
import { MbContentComponent } from './messageboard/mb-content/mb-content.component';
import { MbSidebarComponent } from './messageboard/mb-sidebar/mb-sidebar.component';
import { MbAddchildrenComponent } from './messageboard/mb_sidebar/mb-addchildren/mb-addchildren.component';
import { MbMydaycareComponent } from './messageboard/mb_sidebar/mb-mydaycare/mb-mydaycare.component';
import { MbCalendarComponent } from './messageboard/mb_sidebar/mb-calendar/mb-calendar.component';
import { ParentAddComponent } from './dashboard/parents/parent-add/parent-add.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';

import { RegisterComponent } from './register/register.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { PackagesComponent } from './home/packages/packages.component';
import { ChildAddComponent } from './dashboard/parents/child-add/child-add.component'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessageboardComponent,
    TopnavbarComponent,
    SidenavbarComponent,
    ChildrenComponent,
    ParentsComponent,
    CalendarComponent,
    PostsComponent,
    MbNavbarComponent,
    MbContentComponent,
    MbSidebarComponent,
    MbAddchildrenComponent,
    MbMydaycareComponent,
    MbCalendarComponent,
    ParentAddComponent,
    LoginscreenComponent,
    RegisterComponent,
    PackagesComponent,
    ChildAddComponent,
    
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRouterModule, FullCalendarModule, ReactiveFormsModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
