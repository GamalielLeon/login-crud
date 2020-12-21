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
  private errorPassword: string = 'Se requieren como mínimo 8 caracteres.';

  // References
  createPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.createPasswordForm = formBuilder.group({
      // Required, only admits alphanumerics and must have btw 8 to 10 characters.
      password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}')]],
      passwordConfirm: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}')]]
    });
   }
  ngOnInit(): void { }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.getPasswordsMatched() && this.createPasswordForm.valid) { this.router.navigateByUrl('/'); }
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
      this.setErrorPassword('Se requieren como mínimo 8 caracteres.');
    }
    else if (formControls.password.invalid) {
      this.setErrorPassword('La contraseña ingresada no cumple con la estructura de al menos: 1 Mayúscula, 1 Minúscula y 1 Número.');
    }
  }

  /********** GETTERS **********/
  getPasswordsMatched = (): boolean => this.passwordsMatched;
  getErrorPassword = (): string => this.errorPassword;

  /********** SETTERS **********/
  setPasswordsMatched(passwordsMatched: boolean): void{ this.passwordsMatched = passwordsMatched; }
  setErrorPassword(errorMessage: string): void { this.errorPassword = errorMessage; }
}
