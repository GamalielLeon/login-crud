import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Constants
import { EMAIL_PATTERN, NAME_PATTERN } from 'src/app/constants/patterns';
import { ID_USER } from 'src/app/constants/localStorage-items';
import { getLimitsBirthDate } from 'src/app/constants/functions';
import { EMAIL_ERROR } from '../../constants/messages';
import { NEW_PASSWORD } from 'src/app/constants/paths';
// Others
import { birthDateValidator } from '../../custom-validators/user-form.validators';
import { UsersAPIService } from '../../services/users-api.service';
import { TokenService } from 'src/app/services/token.service';
import { USER_EMAIL } from '../../constants/localStorage-items';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  // References
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private usersService: UsersAPIService, private tokenService: TokenService) {
    this.signUpForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      firstName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      birthDate: ['', [Validators.required, birthDateValidator]],
      password: [this.generateRandomPassword()],
      active: [false],
      salt: ['']
    });
  }
  ngOnInit(): void { }
  /********** METHODS **********/
  private generateRandomPassword(): string {
    const passwordTemp: string[] = Array.from(this.generateRandomNumber(1E14, 0.5, 0, 36));
    passwordTemp[4] = this.generateRandomNumber(25, 0, 10, 36).toUpperCase();
    passwordTemp[1] = this.generateRandomNumber(25, 0, 10, 36);
    passwordTemp[7] = this.generateRandomNumber(9, 0, 0, 10);
    return passwordTemp.join('');
  }
  private generateRandomNumber(amp: number, offset1: number, offset2: number, base: number): string {
    return Math.round( (Math.random() + offset1) * amp + offset2).toString(base);
  }
  private userCreated(user: UserModel): void {
    localStorage.setItem(ID_USER, user.id as string);
    localStorage.setItem(USER_EMAIL, user.email);
    this.router.navigateByUrl(NEW_PASSWORD);
  }
  private checkIfUserDataIsValid(): void {
    this.usersService.createUser(this.signUpForm.value).subscribe(
      (userCreated) => this.userCreated(userCreated),
      (error) => alert(EMAIL_ERROR),
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
  getMaxBirthDate = (): string => getLimitsBirthDate()[1];
}
