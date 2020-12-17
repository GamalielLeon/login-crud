import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PopUpWindowComponent } from './components/pop-up-window/pop-up-window.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { ReserPasswordFormComponent } from './components/reser-password-form/reser-password-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PopUpWindowComponent,
    UserFormComponent,
    SignUpFormComponent,
    ReserPasswordFormComponent,
    LoginFormComponent,
    ResetPasswordFormComponent,
    NewPasswordFormComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
