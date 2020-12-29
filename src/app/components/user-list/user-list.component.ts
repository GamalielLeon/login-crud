import { Component, OnInit } from '@angular/core';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { ADD_USER, EDIT_USER } from '../../constants/paths';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private toggleTableHeaderArrow: boolean = false;
  private usersFromAPI: UserModel[] = [];

  constructor(private usersService: UsersAPIService, private router: Router) {
    this.usersService.getUsers().subscribe( (usersFromAPI: UserModel[]) => this.setUsersFromAPI(usersFromAPI) );
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/image6.jpg")'; }

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
    console.log('add');
    this.router.navigateByUrl(ADD_USER);
  }
  editUser(index: number): void {
    localStorage.setItem('userToEdit', JSON.stringify(this.usersFromAPI[index]));
    this.router.navigateByUrl(EDIT_USER);
  }
  changeStatus(index: number): void {
    const userTemp: UserModel = this.usersFromAPI[index];
    this.usersService.updateUser(userTemp, !userTemp.active).subscribe();
    userTemp.active = !userTemp.active;
  }
  getStatus = (index: number): boolean|void => this.usersFromAPI[index].active ? true : undefined;

  /********** GETTERS **********/
  getUsersFromAPI = (): UserModel[] => this.usersFromAPI;

  /********** SETTERS **********/
  setUsersFromAPI(usersFromAPI: UserModel[]): void { this.usersFromAPI = usersFromAPI; }
}
