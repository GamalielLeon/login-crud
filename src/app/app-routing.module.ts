import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HOME, LOGIN, NEW_PASSWORD, RECOVER_PASSWORD, REGISTER, USERS_LIST, ADD_USER, EDIT_USER, OTHER, MAIN } from './constants/paths';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: MAIN, component: NavbarComponent},
  {path: LOGIN, component: LoginFormComponent},
  {path: REGISTER, component: SignUpFormComponent},
  {path: NEW_PASSWORD, component: NewPasswordFormComponent},
  {path: RECOVER_PASSWORD, component: ResetPasswordFormComponent},
  {path: HOME, component: HomeComponent, canActivate: [AuthGuard]},
  {path: USERS_LIST, component: UserListComponent, canActivate: [AuthGuard]},
  {path: ADD_USER, component: UserFormComponent, canActivate: [AuthGuard]},
  {path: EDIT_USER, component: UserFormComponent, canActivate: [AuthGuard]},
  {path: OTHER, pathMatch: 'full', redirectTo: MAIN}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
