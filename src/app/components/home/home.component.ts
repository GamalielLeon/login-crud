import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Constants
import { MAIN } from '../../constants/paths';
// Others
import { UsersAPIService } from 'src/app/services/users-api.service';
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

  constructor(private usersService: UsersAPIService, private router: Router) {
    this.subscriptions = this.usersService.getUser().subscribe( (user: UserModel) => {
      this.userName = `${user.firstName} ${user.lastName}`;
      this.setLoading(false);
    });
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/image3.jpg")'; }
  ngOnDestroy(): void { this.subscriptions.unsubscribe(); }
  /********** METHODS **********/
  goMainPage(): void {
    this.setLoading(true);
    setTimeout(() => this.router.navigateByUrl(MAIN), 500);
  }
  /********** GETTERS **********/
  getUserName = (): string => this.userName;
  getLoading = (): boolean => this.loading;
  /********** SETTERS **********/
  setUserName(userName: string): void { this.userName = userName; }
  setLoading(loading: boolean): void { this.loading = loading; }
}
