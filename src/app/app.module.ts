
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SessionTimesComponent } from './components/session-times/session-times.component';
import { SessionTimeService } from './services/session-time.service';

@NgModule({
  declarations: [
    SessionTimesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SessionTimeService]
})
export class AppModule { }