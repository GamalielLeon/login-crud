import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Constants
import { NEW_PASSWORD } from 'src/app/constants/paths';
import { EMAIL_PATTERN } from 'src/app/constants/patterns';
import { UsersAPIService } from '../../services/users-api.service';
import { RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_FAIL } from '../../constants/messages';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  // References
  resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private usersService: UsersAPIService) {
    this.resetPasswordForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    });
  }
  ngOnInit(): void { }

  /********** METHODS **********/
  private cheIfEmailExists(): void{
    this.usersService.recoveryPassword(this.resetPasswordForm.controls.email.value).subscribe(
      resp => { alert(RECOVER_PASSWORD_SUCCESS); this.router.navigateByUrl(NEW_PASSWORD); },
      error => alert(RECOVER_PASSWORD_FAIL)
    );
    // this.router.navigateByUrl(NEW_PASSWORD);
  }
  checkSubmit(): void{
    if (this.resetPasswordForm.valid) { this.cheIfEmailExists(); }
    this.resetPasswordForm.markAllAsTouched();
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.resetPasswordForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  /********** GETTERS **********/

  /********** SETTERS **********/
}
