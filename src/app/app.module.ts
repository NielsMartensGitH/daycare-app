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
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PackagesComponent } from './home/packages/packages.component';
import { AddPostFormComponent } from './dashboard/posts/add-post-form/add-post-form.component'; // a plugin!
import { ChildAddComponent } from './dashboard/parents/child-add/child-add.component';
import { EditPostFormComponent } from './dashboard/posts/edit-post-form/edit-post-form.component';
import { ParentDetailsComponent } from './dashboard/parents/parent-details/parent-details.component';
import { ParentEditComponent } from './dashboard/parents/parent-edit/parent-edit.component';
import { CommentsComponent } from './dashboard/posts/comments/comments.component';
import { ChildDiaryComponent } from './dashboard/children/child-diary/child-diary.component';
import { DiaryDirDirective } from './dashboard/children/child-diary/diary-dir.directive';
import { SmileDirective } from './dashboard/children/child-diary/smile.directive';
import { DiariesComponent } from './dashboard/diaries/diaries.component';
import { DiarycommentsComponent } from './dashboard/diaries/diarycomments/diarycomments.component';
import { ImgToggleDirective } from './dashboard/children/img-toggle.directive';
import { EncrDecrService } from '../app/encr-decr.service';
import { MbCommentsComponent } from './messageboard/mb-content/mb-comments/mb-comments.component';
import { ChildEditComponent } from './dashboard/children/child-edit/child-edit.component';
import { MbDiariesComponent } from './messageboard/mb-diaries/mb-diaries.component';
import { MbDiarycommentsComponent } from './messageboard/mb-diaries/mb-diarycomments/mb-diarycomments.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
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
    AddPostFormComponent,
    ChildAddComponent,
    EditPostFormComponent,
    ParentDetailsComponent,
    ParentEditComponent,
    CommentsComponent,
    ChildDiaryComponent,
    DiaryDirDirective,
    SmileDirective,
    DiariesComponent,
    DiarycommentsComponent,
    ImgToggleDirective,
    MbCommentsComponent,
    ChildEditComponent,
    MbDiariesComponent,
    MbDiarycommentsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRouterModule, FullCalendarModule, ReactiveFormsModule, FormsModule
  ],
  providers: [EncrDecrService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
