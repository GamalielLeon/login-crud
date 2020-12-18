import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    this.createPasswordForm = formBuilder.group({
      // Required, only admits alphanumerics and must have btw 6 to 12 characters.
      password: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9Ññ_-]){6,12}')]],
      passwordConfirm: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9Ññ_-]){6,12}')]]
    });
   }

  ngOnInit(): void { }

  checkSubmit(): void{
    if (this.getPasswordsMatched()){
      if (this.createPasswordForm.valid && this.getPasswordsMatched()){
        console.log('submit event works');
      }
    } else{
      window.alert('Passwords do not match');
    }
  }

  isFieldInvalid(fieldName: string): boolean{
    return this.createPasswordForm.controls[fieldName].invalid && this.createPasswordForm.controls[fieldName].touched;
  }

  checkPasswordsMatch(): void{
    const formControls = this.createPasswordForm.controls;
    if (formControls.password.value === formControls.passwordConfirm.value){
      this.setPasswordsMatched(true);
    } else {
      this.setPasswordsMatched(false);
    }
  }

  checkPasswordConfirm(): void{
    const formControls = this.createPasswordForm.controls;
    this.setPasswordsMatched(formControls.password.value === formControls.passwordConfirm.value);
  }

  getPasswordsMatched = (): boolean => this.passwordsMatched;

  setPasswordsMatched(passwordsMatched: boolean): void{ this.passwordsMatched = passwordsMatched; }

}
