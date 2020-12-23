import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopUpWindowComponent } from './components/pop-up-window/pop-up-window.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PopUpWindowComponent,
    UserFormComponent,
    SignUpFormComponent,
    LoginFormComponent,
    ResetPasswordFormComponent,
    NewPasswordFormComponent,
    UserListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
