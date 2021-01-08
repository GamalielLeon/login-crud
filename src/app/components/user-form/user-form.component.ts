import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// Constants
import { USERS_LIST } from 'src/app/constants/paths';
import { getLimitsBirthDate } from '../../constants/functions';
import { EMAIL_PATTERN, NAME_PATTERN } from '../../constants/patterns';
import { ROLES, USER_TO_EDIT } from 'src/app/constants/localStorage-items';
import { USER_EDITED, USER_CREATED, EMAIL_ERROR } from '../../constants/messages';
// Services and Models
import { birthDateValidator } from 'src/app/custom-validators/user-form.validators';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  // Attributes
  private iconUserForm: string = 'fas fa-user-plus fa-6x';
  private titleUserForm: string = 'AGREGAR USUARIO';
  private editUser: boolean = false;
  private userDataInput: UserModel;
  private roles: string[] = [];
  private rolesData: any = {};
  // References
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersAPIService){
    this.userDataInput = { id: '', email: '', firstName: '', lastName: '',
                           roleId: '', birthDate: '', active: true};
    this.setUserDataInput();
    this.userForm = formBuilder.group({
      email: [this.userDataInput.email, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      firstName: [this.userDataInput.firstName, [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastName: [this.userDataInput.lastName, [Validators.required, Validators.pattern(NAME_PATTERN)]],
      birthDate: [this.userDataInput.birthDate.split('T')[0], [Validators.required, birthDateValidator]],
      roleId: [this.roles[0], Validators.required],
      active: [this.userDataInput.active],
      salt: ['']
    });
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/image4.jpg")'; }
  ngOnDestroy(): void { }

  /********** METHODS **********/
  private createOrUpdate(): void {
    const roleID: string = this.rolesData[this.userForm.controls.roleId.value];
    const observable: Observable<UserModel> = this.editUser ?
          this.userService.updateUser({id: this.userDataInput.id, ...this.userForm.value, roleId: roleID}) :
          this.userService.createUser({...this.userForm.value, roleId: roleID});
    this.requestToServer(observable, this.editUser ? USER_EDITED : USER_CREATED);
  }
  private requestToServer(observable: Observable<UserModel>, message: string): void {
    observable.subscribe(
      (resp) => { alert(message); this.router.navigateByUrl(USERS_LIST); }, (error) => alert(EMAIL_ERROR) );
  }
  checkSubmit(): void{
    if (this.userForm.valid) { this.createOrUpdate(); }
    this.userForm.markAllAsTouched();
  }
  onCancel(): void{ this.router.navigateByUrl(USERS_LIST); }
  isFieldInvalid(fieldName: string): boolean{
    const field: AbstractControl = this.userForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  setFormTitleAndIcon(title: string, icon: string): void {
    this.setTitleUserForm(title);
    this.setIconUserForm(icon);
  }
  getMinBirthDate = (): string => getLimitsBirthDate()[0];
  getMaxBirthDate = (): string => getLimitsBirthDate()[1];

  /********** GETTERS **********/
  getRoles = (): string[] => this.roles;
  getTitleUserForm = (): string => this.titleUserForm;
  getIconUserForm = (): string => this.iconUserForm;

  /********** SETTERS **********/
  setTitleUserForm(title: string): void { this.titleUserForm = title; }
  setIconUserForm(icon: string): void { this.iconUserForm = icon; }
  private setUserDataInput(): void {
    const getUserToEdit: string|null = localStorage.getItem(USER_TO_EDIT);
    this.rolesData = JSON.parse(localStorage.getItem(ROLES) as any);
    this.roles = Object.keys(this.rolesData).reverse();
    if (getUserToEdit) {
      this.setFormTitleAndIcon('EDITAR USUARIO', 'fas fa-user-edit fa-6x');
      this.userDataInput = JSON.parse(getUserToEdit);
      this.editUser = true;
      this.setRoles();
    }
  }
  private setRoles(): void {
    const rolesDataTemp: any = {...this.rolesData};
    const rolesAux: string[] = Object.keys(rolesDataTemp);
    const currentRole: string = rolesAux[Object.values(rolesDataTemp).indexOf(this.userDataInput.roleId)];
    rolesAux.splice(rolesAux.indexOf(currentRole), 1);
    this.roles = [currentRole, ...rolesAux];
  }
}
