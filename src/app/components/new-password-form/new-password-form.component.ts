import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Constants
import { ERROR_PASSWORD, ERROR_FORMAT_PASSWORD, PASSWORDS_MISMATCH, UPDATE_PASSWORD_ERROR } from 'src/app/constants/messages';
import { PASSWORD_PATTERN } from 'src/app/constants/patterns';
import { TOKEN } from 'src/app/constants/localStorage-items';
import { LOGIN } from 'src/app/constants/paths';
// Services
import { UsersAPIService } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.css']
})
export class NewPasswordFormComponent implements OnInit {
  // Attributes
  private userId: string = '';
  private passwordsMatched: boolean = true;
  private errorPassword: string = ERROR_PASSWORD;
  // References
  createPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private activeRoute: ActivatedRoute,
              private usersService: UsersAPIService) {
    this.createPasswordForm = formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      passwordConfirm: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]]
    });
    this.activeRoute.params.subscribe(params => this.userId = params.id);
   }
  ngOnInit(): void { }
  /********** METHODS **********/
  private updateUserPassword(): void {
    localStorage.removeItem(TOKEN);
    this.router.navigateByUrl(LOGIN);
  }
  private setUserPassword(): void {
    const newPassword: string = this.createPasswordForm.controls.password.value;
    this.usersService.updatePassword(this.userId, newPassword).subscribe(
      resp => this.updateUserPassword(),
      error => alert(UPDATE_PASSWORD_ERROR)
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
