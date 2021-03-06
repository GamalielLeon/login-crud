import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Constants
import { HOME, LOGIN, NEW_PASSWORD, RECOVER_PASSWORD, REGISTER,
         USERS_LIST, ADD_USER, EDIT_USER, OTHER, MAIN } from './constants/paths';
// Components
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
// Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { CreateUpdateGuard } from './guards/create-update.guard';
import { UserLoggedGuard } from './guards/user-logged.guard';

const routes: Routes = [
  {path: MAIN, component: NavbarComponent},
  {path: LOGIN, component: LoginFormComponent, canActivate: [UserLoggedGuard]},
  {path: REGISTER, component: SignUpFormComponent, canActivate: [UserLoggedGuard]},
  {path: `${NEW_PASSWORD}/:id`, component: NewPasswordFormComponent, canActivate: [UserLoggedGuard]},
  {path: RECOVER_PASSWORD, component: ResetPasswordFormComponent, canActivate: [UserLoggedGuard]},
  {path: HOME, component: HomeComponent, canActivate: [AuthGuard]},
  {path: USERS_LIST, component: UserListComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: ADD_USER, component: UserFormComponent, canActivate: [AuthGuard, AdminGuard, CreateUpdateGuard]},
  {path: EDIT_USER, component: UserFormComponent, canActivate: [AuthGuard, AdminGuard, CreateUpdateGuard]},
  {path: OTHER, pathMatch: 'full', redirectTo: MAIN}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
