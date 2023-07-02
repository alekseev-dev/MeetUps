import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { CreateMeetupTextareaComponent } from './components/create-meetup-textarea/create-meetup-textarea.component';
import { CreateMeetupComponent } from './components/create-meetup/create-meetup.component';
import { CreateNewUserModalComponent } from './components/create-new-user-modal/create-new-user-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { IconComponent } from './components/icon/icon.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { MeetupsListComponent } from './components/meetups-list/meetups-list.component';
import { NewUserModalWindowComponent } from './components/new-user-modal-window/new-user-modal-window.component';
import { SearchCardFormComponent } from './components/search-card-form/search-card-form.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NetworkInterceptor } from "./interceptors/network.interceptor";
import { AllMeetupsPageComponent } from './pages/all-meetups-page/all-meetups-page.component';
import { CreateMeetupPageComponent } from './pages/create-meetup-page/create-meetup-page.component';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MaterialModule } from './shared/material/material.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';

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
    NotFoundPageComponent,
    LoginFormComponent,
    UserListPageComponent,
    UserListItemComponent,
    CreateMeetupTextareaComponent,
    UserListComponent,
    NewUserModalWindowComponent,
    SearchCardFormComponent,
    CreateMeetupPageComponent,
    CreateMeetupComponent,
    CreateNewUserModalComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
