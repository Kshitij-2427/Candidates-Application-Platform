import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobPageComponent } from './job-page/job-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './job-page/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    JobPageComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
