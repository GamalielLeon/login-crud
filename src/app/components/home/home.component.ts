import { Component, OnInit } from '@angular/core';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private loading: boolean = true;
  private userName: string = '';

  constructor(private usersService: UsersAPIService) {
    this.usersService.getUser().subscribe( (user: UserModel) => {
      this.userName = `${user.firstName} ${user.lastName}`;
      this.setLoading(false);
    });
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/image3.jpg")'; }
  /********** GETTERS **********/
  getUserName = (): string => this.userName;
  getLoading = (): boolean => this.loading;
  /********** SETTERS **********/
  setUserName(userName: string): void { this.userName = userName; }
  setLoading(loading: boolean): void { this.loading = loading; }
}
