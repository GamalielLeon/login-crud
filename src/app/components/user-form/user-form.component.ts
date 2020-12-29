import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS_LIST } from 'src/app/constants/paths';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { EMAIL_PATTERN, NAME_PATTERN } from '../../constants/patterns';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  // Attributes
  @Input() titleUserForm: string = 'USUARIO';
  @Input() iconUserForm: string = 'fas fa-user-plus fa-6x';
  private userDataInput: UserModel =
  { id: '', email: '', firstName: '', lastName: '', role: 'General', active: false };
  // References
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersAPIService) {
    this.setUserDataInput();
    this.userForm = formBuilder.group({
      email: [this.userDataInput.email, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      firstName: [this.userDataInput.firstName, [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastName: [this.userDataInput.lastName, [Validators.required, Validators.pattern(NAME_PATTERN)]],
      role: [this.userDataInput.role, Validators.required],
      active: [this.userDataInput.active],
      birthdate: [''],
      salt: ['']
    });
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/image4.jpg")'; }
  ngOnDestroy(): void { localStorage.removeItem('userToEdit'); }

  /********** METHODS **********/
  private createOrUpdate(): void {
    const getUserToEdit: string|null = localStorage.getItem('userToEdit');
    let messageAlert: string = 'Se ha enviado un correo electrónico al usuario para continuar con el registro';
    if (getUserToEdit) {
      messageAlert = 'Se ha actualizado correctamente el registro.';
      this.userDataInput = JSON.parse(getUserToEdit);
      this.userService.updateUser({id: this.userDataInput.id, ...this.userForm.value}).subscribe();
    }
    else { this.userService.createUser(this.userForm.value).subscribe(); }
    alert(messageAlert);
  }
  checkSubmit(): void{
    if (this.userForm.valid) {
      this.createOrUpdate();
      this.router.navigateByUrl(USERS_LIST);
    }
    this.userForm.markAllAsTouched();
  }
  onCancel(): void{ this.router.navigateByUrl(USERS_LIST); }
  isFieldInvalid(fieldName: string): boolean{
    const field: AbstractControl = this.userForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  getMaxDate(): string{
    const today: Date = new Date();
    return (today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString() + '-' + today.getDate().toString());
  }
  getRoles(): string[] {
    const roleSelected: string = this.userDataInput.role;
    return [roleSelected, roleSelected === 'Admin' ? 'General' : 'Admin'];
  }
  /********** GETTERS **********/

  /********** SETTERS **********/
  private setUserDataInput(): void {
    const getUserToEdit: string|null = localStorage.getItem('userToEdit');
    if (getUserToEdit) { this.userDataInput = JSON.parse(getUserToEdit); }
  }
}
