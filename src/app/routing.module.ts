import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageboardComponent } from './messageboard/messageboard.component';
import { MbContentComponent } from './messageboard/mb-content/mb-content.component';
import { Routes, RouterModule } from '@angular/router';
import { ChildrenComponent } from './dashboard/children/children.component';
import { ParentsComponent } from './dashboard/parents/parents.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { PostsComponent } from './dashboard/posts/posts.component';
import { ParentAddComponent } from './dashboard/parents/parent-add/parent-add.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';
import { RegisterComponent } from './register/register.component';
import { PackagesComponent } from './home/packages/packages.component';
import { DiariesComponent } from './dashboard/diaries/diaries.component';
import { MbDiariesComponent } from './messageboard/mb-diaries/mb-diaries.component';

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'messageboard', component: MessageboardComponent, children: [
        {path: '', component: MbContentComponent},
        {path: 'childdiaries', component: MbDiariesComponent}
    ]},
    {path: 'dashboard', component: DashboardComponent, children: [
        {path: '', component: ChildrenComponent},
        {path: 'children', component: ChildrenComponent},
        {path: 'parents', component: ParentsComponent, children: [
            {path: 'parent-add', component: ParentAddComponent}
        ]},
        {path: 'calendar', component: CalendarComponent},
        {path: 'posts', component: PostsComponent},
        {path: 'diaries', component: DiariesComponent}

    ]},
    {path: 'login', component: LoginscreenComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'packages', component: PackagesComponent},
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule {}