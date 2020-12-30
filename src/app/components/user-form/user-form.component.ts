import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS_LIST } from 'src/app/constants/paths';
import { RoleModel } from 'src/app/models/role.model';
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
  private userDataInput: UserModel;
  private roles: string[] = [];
  private rolesData: any = {};
  private editUser: boolean = false;
  // References
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UsersAPIService){
    this.userDataInput = { id: '', email: '', firstName: '',
                           lastName: '', roleId: '', birthDate: '', active: true};
    this.setUserDataInput();
    this.userForm = formBuilder.group({
      email: [this.userDataInput.email, [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      firstName: [this.userDataInput.firstName, [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastName: [this.userDataInput.lastName, [Validators.required, Validators.pattern(NAME_PATTERN)]],
      roleId: [this.roles[0], Validators.required],
      birthDate: [this.userDataInput.birthDate.split('T')[0], Validators.required],
      active: [this.userDataInput.active],
      salt: ['']
    });
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/image4.jpg")'; }
  ngOnDestroy(): void {
    localStorage.removeItem('userToEdit');
    localStorage.removeItem('roles');
  }

  /********** METHODS **********/
  private createOrUpdate(): void {
    this.userForm.patchValue({roleId: this.rolesData[this.userForm.controls.roleId.value]});
    // const getUserToEdit: string|null = localStorage.getItem('userToEdit');
    let messageAlert: string = 'Se ha enviado un correo electrónico al usuario para continuar con el registro';
    if (this.editUser) {
      messageAlert = 'Se ha actualizado correctamente el registro.';
      // this.userDataInput = JSON.parse(getUserToEdit);
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
  getRoles = (): string[] => this.roles;
  /********** GETTERS **********/

  /********** SETTERS **********/
  private setUserDataInput(): void {
    const getUserToEdit: string|null = localStorage.getItem('userToEdit');
    this.rolesData = JSON.parse(localStorage.getItem('roles') as any);
    this.roles = Object.keys(this.rolesData).reverse();
    if (getUserToEdit) {
      this.userDataInput = JSON.parse(getUserToEdit);
      this.editUser = true;
      this.setRoles();
    }
  }
  private setRoles(): void {
    const rolesDataTemp: any = {...this.rolesData};
    const rolesAux: string[] = Object.keys(rolesDataTemp);
    const currentRole: string = rolesAux[ Object.values(rolesDataTemp).indexOf(this.userDataInput.roleId) ];
    rolesAux.splice(rolesAux.indexOf(currentRole), 1);
    this.roles = [currentRole, ...rolesAux];
  }
}
