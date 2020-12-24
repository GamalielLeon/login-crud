import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS_LIST } from 'src/app/constants/paths';
import { EMAIL_PATTERN, NAME_PATTERN } from '../../constants/patterns';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() titleUserForm: string = 'USUARIO';
  @Input() iconUserForm: string = 'fas fa-user-plus fa-6x';
  // References
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.userForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      firstName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastName: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      role: ['General', Validators.required],
      birthdate: ['']
    });
  }
  ngOnInit(): void { }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.userForm.valid) { this.router.navigateByUrl(USERS_LIST); }
    this.userForm.markAllAsTouched();
  }
  onCancel(): void{ this.router.navigateByUrl(USERS_LIST); }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.userForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  getMaxDate(): string{
    const today = new Date();
    return (today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getDate().toString());
  }
  getRoles = (): string[] => ['General', 'Admin'];

  /********** GETTERS **********/

  /********** SETTERS **********/
}
