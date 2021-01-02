import { Component, OnInit } from '@angular/core';
import { UsersAPIService } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userName: string = '';

  constructor(private usersService: UsersAPIService) {
    this.usersService.getUser().subscribe(user => this.userName = `${user.firstName} ${user.lastName}`);
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/image3.jpg")'; }
  /********** GETTERS **********/
  getUserName = (): string => this.userName;
  /********** SETTERS **********/
  setUserName(userName: string): void { this.userName = userName; }
}
