import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageboardComponent } from './messageboard/messageboard.component';
import { AppRouterModule } from './routing.module';
import { FeedsComponent } from './messageboard/feeds/feeds.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessageboardComponent,
    FeedsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
