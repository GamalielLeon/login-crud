import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9._-]{2,})+([@]+[a-zA-Z0-9._-]{2,})+([\.]+[a-z]{2,5}$)')]],
    });
  }

  ngOnInit(): void { }

  checkSubmit(): void{
    if (this.resetPasswordForm.valid) { this.router.navigateByUrl('/newPassword'); }
    this.resetPasswordForm.markAllAsTouched();
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.resetPasswordForm.controls[fieldName];
    return field.invalid && field.touched;
  }

  /********** GETTERS **********/

  /********** SETTERS **********/

}
