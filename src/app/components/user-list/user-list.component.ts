import { Component, OnInit } from '@angular/core';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { ADD_USER, EDIT_USER, USERS_LIST } from '../../constants/paths';
import { ApiDataModel } from 'src/app/models/apiData.model';
import { RolesApiService } from '../../services/roles-api.service';
import { RoleModel } from 'src/app/models/role.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private toggleTableHeaderArrow: boolean = false;
  private usersFromAPI: UserModel[] = [];
  private pagesData: ApiDataModel;
  private pages: number[] = [];
  private roles: any = {};
  routePages: string = `/${USERS_LIST}`;

  constructor(private usersService: UsersAPIService, private router: Router, private rolesService: RolesApiService) {
    this.pagesData = {pageNumber: 1, pageSize: 10, totalPages: 1, totalRecords: 0, data: []};
    this.usersService.getRecords(1).subscribe( (apiData: ApiDataModel) => this.setDataFromAPI(apiData) );
    this.rolesService.getRoles().subscribe( (rolesFromAPI: RoleModel[]) => this.getRoleNamesAndRoleIds(rolesFromAPI) );
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/image6.jpg")'; }

  private getRoleNamesAndRoleIds(rolesFromAPI: RoleModel[]): void {
    rolesFromAPI.forEach( (role: RoleModel) => Object.defineProperty(
      this.roles, role.id, {value: role.name.toUpperCase(), enumerable: true}) );
  }
  private setDataFromAPI(apiData: ApiDataModel): void {
    this.setPagesData(apiData);
    this.setUsersFromAPI(apiData.data);
  }
  private setPagesData(pagesData: ApiDataModel): void {
    this.pagesData = pagesData;
    let page: number = this.pagesData.totalPages;
    this.pages.splice(0, this.pages.length);
    for (; page > 0; page--) { this.pages.unshift(page); }
  }
  private getTableHeaders(indexTh: number): any {
    const ths = document.getElementsByTagName('th');
    for (let i = ths.length - 1; i >= 0; i--) { ths[i].setAttribute('class', ''); }
    return ths[indexTh];
  }
  private sortByColumn(propToSort: string, sortDirection: number): void {
    this.usersFromAPI.sort( (a: any, b: any) =>
      ( a[propToSort].toString().toLowerCase().charCodeAt(0)
        - b[propToSort].toString().toLowerCase().charCodeAt(0) ) * sortDirection
    );
  }
  private createNewRolesObject(): void {
    const objTemp: any = {};
    for (const roleId of Object.keys(this.roles)) { objTemp[this.roles[roleId]] = roleId; }
    localStorage.setItem('roles', JSON.stringify(objTemp));
  }
  changeArrowTableHeader(prop: string, indexTh: number): void {
    this.toggleTableHeaderArrow = !this.toggleTableHeaderArrow;
    const th = this.getTableHeaders(indexTh);
    if (this.toggleTableHeaderArrow) {
      th.setAttribute('class', 'arrow-up');
      this.sortByColumn(prop, 1);
    } else {
      th.setAttribute('class', 'arrow-down');
      this.sortByColumn(prop, -1);
    }
  }
  addUser(): void{
    this.createNewRolesObject();
    this.router.navigateByUrl(ADD_USER);
  }
  editUser(index: number): void {
    localStorage.setItem('userToEdit', JSON.stringify(this.usersFromAPI[index]));
    this.createNewRolesObject();
    this.router.navigateByUrl(EDIT_USER);
  }
  changeStatus(index: number): void {
    const userTemp: UserModel = this.usersFromAPI[index];
    this.usersService.updateUser(userTemp, !userTemp.active).subscribe();
    userTemp.active = !userTemp.active;
  }
  changePage(page: number): void {
    this.usersService.getRecords(page).subscribe( (apiData: ApiDataModel) => this.setDataFromAPI(apiData) );
  }
  getStatus = (index: number): boolean|void => this.usersFromAPI[index].active ? true : undefined;

  /********** GETTERS **********/
  getPages = (): number[] => this.pages;
  getUsersFromAPI = (): UserModel[] => this.usersFromAPI;
  getRol = (prop: any): string => this.roles[prop];
  getPagesData = (): ApiDataModel => this.pagesData;

  /********** SETTERS **********/
  setUsersFromAPI(usersFromAPI: UserModel[]): void { this.usersFromAPI = usersFromAPI; }
}
