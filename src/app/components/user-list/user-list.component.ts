import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
// Constants
import { ADD_USER, EDIT_USER, USERS_LIST, HOME, MAIN } from 'src/app/constants/paths';
import { USER_TO_EDIT, ROLES, PAGE } from 'src/app/constants/localStorage-items';
// Services
import { RolesApiService } from 'src/app/services/roles-api.service';
import { UsersAPIService } from 'src/app/services/users-api.service';
// Models
import { UserModel } from 'src/app/models/user.model';
import { RoleModel } from 'src/app/models/role.model';
import { ApiDataModel } from 'src/app/models/apiData.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private toggleTableHeaderArrow: boolean = false;
  private indexUserSelected: number = 0;
  private loading: boolean = true;
  private usersFromAPI: UserModel[] = [];
  private pages: number[] = [];
  private pagesData: ApiDataModel;
  private roles: any = {};
  routePages: string = `/${USERS_LIST}`;

  constructor(private usersService: UsersAPIService, private router: Router,
              private rolesService: RolesApiService) {
    this.pagesData = {pageNumber: 1, pageSize: 10, totalPages: 1, totalRecords: 0, data: []};
    const page: number = +(localStorage.getItem(PAGE) as string);
    this.usersService.getRecords(page).subscribe( apiData => this.setDataFromAPI(apiData) );
    this.rolesService.getRoles().subscribe( rolesFromAPI => {
      this.getRoleNamesAndRoleIds(rolesFromAPI);
      this.setLoading(false);
    });
  }
  ngOnInit(): void {
    document.body.style.backgroundImage = 'url("assets/images/image6.jpg")';
    localStorage.removeItem(USER_TO_EDIT);
    localStorage.removeItem(ROLES);
  }

  /********** METHODS **********/
  private getRoleNamesAndRoleIds(rolesFromAPI: RoleModel[]): void {
    rolesFromAPI.forEach( role => Object.defineProperty(
      this.roles, role.id, {value: role.name.toUpperCase(), enumerable: true}) );
  }
  private setDataFromAPI(apiData: ApiDataModel): void {
    this.setPagesData(apiData);
    this.setUsersFromAPI(apiData.data);
    localStorage.setItem(PAGE, this.pagesData.pageNumber.toString());
  }
  private setPagesData(pagesData: ApiDataModel): void {
    this.pagesData = pagesData;
    this.pages.splice(0, this.pages.length);
    let page: number = this.pagesData.totalPages;
    for (; page > 0; page--) { this.pages.unshift(page); }
  }
  private getTableHeaders(indexTh: number): any {
    const ths = document.getElementsByTagName('th');
    for (let i = ths.length - 1; i >= 0; i--) { ths[i].removeAttribute('class'); }
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
  createButtonTempHTML(index: number): void {
    this.indexUserSelected = index;
    const sectionHTMLTemp: HTMLElement = document.getElementById('usersTable') as HTMLElement;
    const buttonHTMLTemp: HTMLElement = document.createElement('button');
    buttonHTMLTemp.setAttribute('data-bs-target', '#popUpWindow');
    buttonHTMLTemp.setAttribute('data-bs-toggle', 'modal');
    buttonHTMLTemp.setAttribute('type', 'button');
    sectionHTMLTemp.appendChild(buttonHTMLTemp);
    buttonHTMLTemp.click();
    sectionHTMLTemp.removeChild(buttonHTMLTemp);
  }
  changeStatus(acceptChange: boolean): void {
    if (acceptChange) {
      const userTemp: UserModel = this.usersFromAPI[this.indexUserSelected];
      userTemp.active = !userTemp.active;
      this.usersService.updateUser(userTemp).subscribe();
    }
    else { (document.getElementById(`userStatus${this.indexUserSelected}`) as HTMLElement).click(); }
  }
  changePage(page: number): void {
    this.usersService.getRecords(page).subscribe(apiData => this.setDataFromAPI(apiData));
  }
  exportExcel(idTable: string): void {
    const table: HTMLElement = document.getElementById(idTable) as HTMLElement;
    const workSheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    for (let i: number = this.usersFromAPI.length - 1; i >= 0; i--) {
      workSheet['G' + (i + 2)] = {t: 's', v: this.usersFromAPI[i].active ? 'Activo' : 'Inactivo'};
    }
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    XLSX.writeFile(workBook, 'usersData.xlsx');
  }
  nextPage(): void { this.changePage(++this.pagesData.pageNumber); }
  previousPage(): void { this.changePage(--this.pagesData.pageNumber); }
  fistPage(): void { this.changePage(this.pagesData.pageNumber = 1); }
  lastPage(): void { this.changePage(this.pagesData.pageNumber = this.pagesData.totalPages); }
  getStatus = (index: number): boolean|void => this.usersFromAPI[index].active ? true : undefined;
  navigate(route: string): void {
    this.setLoading(true);
    setTimeout(() => this.router.navigateByUrl(route === 'home' ? HOME : MAIN), 1000);
  }
  /********** GETTERS **********/
  getPages(): number[] {
    const currentPage: number = this.pagesData.pageNumber;
    let pagesToShow = this.pages.slice(this.pagesData.pageNumber - 2, this.pagesData.pageNumber + 1);
    if ( currentPage === 1) {
      pagesToShow = this.pages.slice(this.pagesData.pageNumber - 1, this.pagesData.pageNumber + 2);
    } else if ( currentPage === this.pagesData.totalPages ) {
      pagesToShow = this.pages.slice(this.pagesData.pageNumber - 3, this.pagesData.pageNumber);
    }
    return pagesToShow;
  }
  getUsersFromAPI = (): UserModel[] => this.usersFromAPI;
  getRol = (prop: any): string => this.roles[prop];
  getPagesData = (): ApiDataModel => this.pagesData;
  getLoading = (): boolean => this.loading;
  /********** SETTERS **********/
  setUsersFromAPI(usersFromAPI: UserModel[]): void { this.usersFromAPI = usersFromAPI; }
  setLoading(loading: boolean): void { this.loading = loading; }
}
