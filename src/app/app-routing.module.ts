import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from '../assets/const/common';
import { AuthGuard } from './guards/auth.guard';
import { AllMeetupsPageComponent } from './pages/all-meetups-page/all-meetups-page.component';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: AppRoute.Root, component: InstructionPageComponent },
  { path: AppRoute.Login, component: LoginPageComponent },
  { path: AppRoute.AllMeetups, component: AllMeetupsPageComponent, canActivate: [AuthGuard] },
  { path: `${AppRoute.Admin}${AppRoute.UsersList}`, component: NotFoundPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
