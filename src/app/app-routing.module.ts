import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { PopUpWindowComponent } from './components/pop-up-window/pop-up-window.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: SignUpFormComponent},
  {path: 'newPassword', component: NewPasswordFormComponent},
  {path: 'popup', component: PopUpWindowComponent},
  {path: 'detail', component: UserListComponent},
  {path: 'addUser', component: UserFormComponent},
  {path: 'editUser', component: UserFormComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
