import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Constants
import { ERROR_PASSWORD, ERROR_FORMAT_PASSWORD, PASSWORDS_MISMATCH, UPDATE_PASSWORD_ERROR } from '../../constants/messages';
import { LOGIN } from 'src/app/constants/paths';
import { PASSWORD_PATTERN } from 'src/app/constants/patterns';
import { ID_USER } from '../../constants/localStorage-items';
// Others
import { UsersAPIService } from '../../services/users-api.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.css']
})
export class NewPasswordFormComponent implements OnInit {
  // Attributes
  private passwordsMatched: boolean = true;
  private errorPassword: string = ERROR_PASSWORD;
  // References
  createPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private usersService: UsersAPIService) {
    this.createPasswordForm = formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      passwordConfirm: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]]
    });
   }
  ngOnInit(): void { }
  /********** METHODS **********/
  private updateUserPassword(user: UserModel): void {
    const newPassword: string = this.createPasswordForm.controls.password.value;
    this.usersService.updateUser({...user, password: newPassword}, true).subscribe(
      (resp) => this.router.navigateByUrl(LOGIN),
      (error) => alert(UPDATE_PASSWORD_ERROR)
    );
  }
  private setUserPassword(): void {
    this.usersService.getUser(localStorage.getItem(ID_USER) as string).subscribe(
      (user) => this.updateUserPassword(user),
      (error) => alert(UPDATE_PASSWORD_ERROR)
    );
  }
  checkSubmit(): void{
    if (this.getPasswordsMatched() && this.createPasswordForm.valid) { this.setUserPassword(); }
    this.createPasswordForm.markAllAsTouched();
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.createPasswordForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  checkPasswordConfirm(): void{
    const formControls = this.createPasswordForm.controls;
    this.setPasswordsMatched(formControls.password.value === formControls.passwordConfirm.value);
    if (formControls.password.value.length < 8) {
      this.setErrorPassword(ERROR_PASSWORD);
    }
    else if (formControls.password.invalid) {
      this.setErrorPassword(ERROR_FORMAT_PASSWORD);
    }
  }
  getMessagePasswordsMismatch = (): string => PASSWORDS_MISMATCH;

  /********** GETTERS **********/
  getPasswordsMatched = (): boolean => this.passwordsMatched;
  getErrorPassword = (): string => this.errorPassword;
  /********** SETTERS **********/
  setPasswordsMatched(passwordsMatched: boolean): void{ this.passwordsMatched = passwordsMatched; }
  setErrorPassword(errorMessage: string): void { this.errorPassword = errorMessage; }
}
