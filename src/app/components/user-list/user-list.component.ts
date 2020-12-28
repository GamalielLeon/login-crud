import { Component, OnInit } from '@angular/core';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private toggleTableHeaderArrow: boolean = false;
  usersFromAPI: UserModel[] = [];

  constructor(private usersService: UsersAPIService) {
    this.usersService.getUsers().subscribe( (users: UserModel[]) => this.usersFromAPI = users );
  }

  ngOnInit(): void { document.body.style.backgroundImage = 'url("")'; }

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
  arrow(prop: string, indexTh: number): void {
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

  f(): void {
    alert('editar');
  }
}
