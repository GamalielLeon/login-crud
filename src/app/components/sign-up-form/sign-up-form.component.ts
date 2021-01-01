import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Constants
import { getLimitsBirthDate } from 'src/app/constants/functions';
import { NEW_PASSWORD } from 'src/app/constants/paths';
import { EMAIL_PATTERN, NAME_PATTERN } from 'src/app/constants/patterns';
// Others
import { birthDateValidator } from '../../custom-validators/user-form.validators';

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
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      firstName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      birthDate: ['', [Validators.required, birthDateValidator]]
    });
  }
  ngOnInit(): void { }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.signUpForm.valid) { this.router.navigateByUrl(NEW_PASSWORD); }
    this.signUpForm.markAllAsTouched();
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.signUpForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  getMinBirthDate = (): string => getLimitsBirthDate()[0];
  getMaxBirthDate = (): string => getLimitsBirthDate()[1];

  /********** GETTERS **********/

  /********** SETTERS **********/
}
