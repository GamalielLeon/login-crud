import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  // References
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signUpForm = formBuilder.group({
      // Required, only admits alphanumerics and must have btw 6 to 12 characters.
      email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9._-]{2,})+([@]+[a-zA-Z0-9._-]{2,})+([\.]+[a-z]{2,5}$)')]],
      firstName: ['', [Validators.required, Validators.pattern('([a-zA-ZÑñáéíóúÁÉÍÓÚ ]){3,50}')]],
      lastName: ['', [Validators.required, Validators.pattern('([a-zA-ZÑñáéíóúÁÉÍÓÚ ]){3,50}')]],
      birthdate: ['']
    });
  }
  ngOnInit(): void { }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.signUpForm.valid) { this.router.navigateByUrl('newPassword'); }
    this.signUpForm.markAllAsTouched();
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.signUpForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  getMaxDate(): string{
    const today = new Date();
    return (today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getDate().toString());
  }

  /********** GETTERS **********/

  /********** SETTERS **********/

}
