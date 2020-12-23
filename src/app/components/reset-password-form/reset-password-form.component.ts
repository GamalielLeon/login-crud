import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NEW_PASSWORD } from 'src/app/constants/paths';
import { EMAIL_PATTERN } from 'src/app/constants/patterns';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  // References
  resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.resetPasswordForm = formBuilder.group({
      // Required, only admits alphanumerics and must have btw 6 to 12 characters.
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    });
  }

  ngOnInit(): void { }

  checkSubmit(): void{
    if (this.resetPasswordForm.valid) { this.router.navigateByUrl(NEW_PASSWORD); }
    this.resetPasswordForm.markAllAsTouched();
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.resetPasswordForm.controls[fieldName];
    return field.invalid && field.touched;
  }

  /********** GETTERS **********/

  /********** SETTERS **********/

}
