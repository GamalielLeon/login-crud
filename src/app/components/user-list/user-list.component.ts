import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// Constants
import { ADD_USER, EDIT_USER, USERS_LIST } from '../../constants/paths';
import { USER_TO_EDIT, ROLES, PAGE } from '../../constants/localStorage-items';
// Services
import { RolesApiService } from '../../services/roles-api.service';
import { UsersAPIService } from 'src/app/services/users-api.service';
// Models
import { UserModel } from '../../models/user.model';
import { RoleModel } from 'src/app/models/role.model';
import { ApiDataModel } from 'src/app/models/apiData.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  private toggleTableHeaderArrow: boolean = false;
  private usersFromAPI: UserModel[] = [];
  private pagesData: ApiDataModel;
  private pages: number[] = [];
  private roles: any = {};
  private loading = true;
  routePages: string = `/${USERS_LIST}`;

  constructor(private usersService: UsersAPIService, private router: Router, private rolesService: RolesApiService) {
    this.pagesData = {pageNumber: 1, pageSize: 10, totalPages: 1, totalRecords: 0, data: []};
    const page: number = +(localStorage.getItem(PAGE) as string);
    this.usersService.getRecords(page).subscribe( (apiData: ApiDataModel) => this.setDataFromAPI(apiData) );
    this.rolesService.getRoles().subscribe((rolesFromAPI: RoleModel[]) =>
      this.getRoleNamesAndRoleIds(rolesFromAPI), console.log , () => this.setLoading(false) );
  }
  ngOnInit(): void {
    document.body.style.backgroundImage = 'url("assets/images/image6.jpg")';
    localStorage.removeItem(USER_TO_EDIT);
    localStorage.removeItem(ROLES);
  }
  ngOnDestroy(): void { }

  /********** METHODS **********/
  private getRoleNamesAndRoleIds(rolesFromAPI: RoleModel[]): void {
    rolesFromAPI.forEach( (role: RoleModel) => Object.defineProperty(
      this.roles, role.id, {value: role.name.toUpperCase(), enumerable: true}) );
  }
  private setDataFromAPI(apiData: ApiDataModel): void {
    this.setPagesData(apiData);
    this.setUsersFromAPI(apiData.data);
    localStorage.setItem(PAGE, this.pagesData.pageNumber.toString());
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
    localStorage.setItem(ROLES, JSON.stringify(objTemp));
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
    localStorage.setItem(USER_TO_EDIT, JSON.stringify(this.usersFromAPI[index]));
    this.createNewRolesObject();
    this.router.navigateByUrl(EDIT_USER);
  }
  changeStatus(index: number): void {
    const userTemp: UserModel = this.usersFromAPI[index];
    this.usersService.updateUser(userTemp, !userTemp.active).subscribe();
    userTemp.active = !userTemp.active;
  }
  changePage(page: number): void {
    this.usersService.getRecords(page).subscribe((apiData: ApiDataModel) => this.setDataFromAPI(apiData));
  }
  getStatus = (index: number): boolean|void => this.usersFromAPI[index].active ? true : undefined;

  /********** GETTERS **********/
  getPages = (): number[] => this.pages;
  getUsersFromAPI = (): UserModel[] => this.usersFromAPI;
  getRol = (prop: any): string => this.roles[prop];
  getPagesData = (): ApiDataModel => this.pagesData;
  getLoading = (): boolean => this.loading;

  /********** SETTERS **********/
  setUsersFromAPI(usersFromAPI: UserModel[]): void { this.usersFromAPI = usersFromAPI; }
  setLoading(loading: boolean): void { this.loading = loading; }
}
