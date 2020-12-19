import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.css']
})
export class NewPasswordFormComponent implements OnInit {
  // Attributes
  private passwordsMatched: boolean = true;

  // References
  createPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createPasswordForm = formBuilder.group({
      // Required, only admits alphanumerics and must have btw 6 to 12 characters.
      password: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9Ññ_-]){6,12}')]],
      passwordConfirm: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9Ññ_-]){6,12}')]]
    });
   }
  ngOnInit(): void { }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.getPasswordsMatched() && this.createPasswordForm.valid) { this.router.navigateByUrl('/login'); }
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.createPasswordForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  checkPasswordConfirm(): void{
    const formControls = this.createPasswordForm.controls;
    this.setPasswordsMatched(formControls.password.value === formControls.passwordConfirm.value);
  }

  /********** GETTERS **********/
  getPasswordsMatched = (): boolean => this.passwordsMatched;

  /********** SETTERS **********/
  setPasswordsMatched(passwordsMatched: boolean): void{ this.passwordsMatched = passwordsMatched; }
}
