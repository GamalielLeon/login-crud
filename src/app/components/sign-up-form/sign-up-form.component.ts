import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  // Attributes
  private maxDate: string = '';
  // References
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.signUpForm = formBuilder.group({
      // Required, only admits alphanumerics and must have btw 6 to 12 characters.
      email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9._-]{2,})+([@]+[a-zA-Z0-9._-]{2,})+([\.]+[a-z]{2,5}$)')]],
      firstName: ['', [Validators.required, Validators.pattern('([a-zA-ZÑñáéíóúÁÉÍÓÚ ]){3,}')]],
      lastName: ['', [Validators.required, Validators.pattern('([a-zA-ZÑñáéíóúÁÉÍÓÚ ]){3,}')]],
      birthdate: ['']
    });
  }
  ngOnInit(): void {
    const today = new Date();
    this.maxDate = today.getFullYear().toString() + '-' + today.getMonth().toString() + '-' + today.getDate().toString();
  }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.signUpForm.valid) { this.router.navigateByUrl('/newPassword'); }
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.signUpForm.controls[fieldName];
    return field.invalid && field.touched;
  }

  /********** GETTERS **********/
  getMaxDate = (): string => this.maxDate;

  /********** SETTERS **********/

}
