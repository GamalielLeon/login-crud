import { Component, OnInit } from '@angular/core';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  usersFromAPI: UserModel[] = [];

  constructor(private usersService: UsersAPIService) {
    this.usersService.getUsers().subscribe( (users: UserModel[]) => this.usersFromAPI = users );
  }

  ngOnInit(): void { document.body.style.backgroundImage = 'url("")'; }
}
