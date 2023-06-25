import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute, Role } from '../assets/const/common';
import { AuthGuard } from './guards/auth.guard';
import { AllMeetupsPageComponent } from './pages/all-meetups-page/all-meetups-page.component';
import { InstructionPageComponent } from './pages/instruction-page/instruction-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';

const routes: Routes = [
  { path: AppRoute.Root, component: InstructionPageComponent },
  { path: AppRoute.Login, component: LoginPageComponent },
  { path: AppRoute.UserAllMeetups, component: AllMeetupsPageComponent, canActivate: [AuthGuard] },
  { path: AppRoute.AdminUsersList, component: UserListPageComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
