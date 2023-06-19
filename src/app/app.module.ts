import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { MeetupsListComponent } from './components/meetups-list/meetups-list.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MaterialModule } from './shared/material/material.module';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MeetupCardComponent,
    MeetupsListComponent,
    DateFormatPipe,
    ButtonComponent,
    IconComponent,
    TranslatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
