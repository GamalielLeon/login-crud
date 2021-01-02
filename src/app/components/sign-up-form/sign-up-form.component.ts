import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Constants
import { getLimitsBirthDate } from 'src/app/constants/functions';
import { NEW_PASSWORD } from 'src/app/constants/paths';
import { EMAIL_PATTERN, NAME_PATTERN } from 'src/app/constants/patterns';
// Others
import { birthDateValidator } from '../../custom-validators/user-form.validators';
import { UsersAPIService } from '../../services/users-api.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  // References
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private usersService: UsersAPIService) {
    this.signUpForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      firstName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      birthDate: ['', [Validators.required, birthDateValidator]],
      active: [false],
      salt: ['']
    });
  }
  ngOnInit(): void { }

  /********** METHODS **********/
  private checkIfUserDataIsValid(): void {
    this.usersService.createUser(this.signUpForm.value).subscribe(
      (userCreated) => this.usersService.updateUser(userCreated, false).subscribe(),
      (error) => console.log(error),
      () => this.router.navigateByUrl(NEW_PASSWORD)
    );
  }
  checkSubmit(): void{
    if (this.signUpForm.valid) { this.checkIfUserDataIsValid(); }
    this.signUpForm.markAllAsTouched();
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.signUpForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  getMinBirthDate = (): string => getLimitsBirthDate()[0];
  getMaxBirthDate = (): string => { console.log(getLimitsBirthDate()[1]); return getLimitsBirthDate()[1]; };

  /********** GETTERS **********/

  /********** SETTERS **********/
}
