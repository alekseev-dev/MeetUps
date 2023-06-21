import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { MeetupsListComponent } from './components/meetups-list/meetups-list.component';
import { AllMeetupsPageComponent } from './pages/all-meetups-page/all-meetups-page.component';
import { CreateMeetupComponent } from './pages/create-meetup/create-meetup.component';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MyMeetupsPageComponent } from './pages/my-meetups-page/my-meetups-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MaterialModule } from './shared/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    MeetupCardComponent,
    MeetupsListComponent,
    DateFormatPipe,
    ButtonComponent,
    IconComponent,
    HeaderComponent,
    AllMeetupsPageComponent,
    LoginPageComponent,
    InstructionPageComponent,
    MyMeetupsPageComponent,
    CreateMeetupComponent,
    NotFoundPageComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
