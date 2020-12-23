import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HOME, LOGIN, NEW_PASSWORD, RECOVER_PASSWORD, REGISTER, USERS_LIST, ADD_USER, EDIT_USER, OTHER } from './constants/paths';

const routes: Routes = [
  {path: HOME, component: NavbarComponent},
  {path: LOGIN, component: LoginFormComponent},
  {path: REGISTER, component: SignUpFormComponent},
  {path: NEW_PASSWORD, component: NewPasswordFormComponent},
  {path: RECOVER_PASSWORD, component: ResetPasswordFormComponent},
  {path: USERS_LIST, component: UserListComponent},
  {path: ADD_USER, component: UserFormComponent},
  {path: EDIT_USER, component: UserFormComponent},
  {path: OTHER, pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
