import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { ID_USER } from 'src/app/constants/localStorage-items';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private userName: string = '';
  private loading: boolean = true;
  private subscriptions: Subscription = new Subscription();

  constructor(private usersService: UsersAPIService) {
    this.subscriptions = this.usersService.getUser().subscribe( (user: UserModel) => {
      this.userName = `${user.firstName} ${user.lastName}`;
      this.setLoading(false);
    });
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/image3.jpg")'; }
  ngOnDestroy(): void { this.subscriptions.unsubscribe(); }
  /********** GETTERS **********/
  getUserName = (): string => this.userName;
  getLoading = (): boolean => this.loading;
  /********** SETTERS **********/
  setUserName(userName: string): void { this.userName = userName; }
  setLoading(loading: boolean): void { this.loading = loading; }
}
