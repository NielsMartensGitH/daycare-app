import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedsComponent } from './messageboard/feeds/feeds.component';
import { MessageboardComponent } from './messageboard/messageboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: '/messageboard', pathMatch: 'full'},
    {path: 'messageboard', component: MessageboardComponent, children: [
        {path: ':id', component: FeedsComponent}
    ]},
    {path: 'dashboard', component: DashboardComponent}
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouterModule {}