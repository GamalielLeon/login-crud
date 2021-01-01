import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// Constants
import { FAIL_ATTEMPTS, WRONG_LOGIN } from '../constants/messages';
import { TOKEN } from '../constants/localStorage-items';
// Models
import { UserModel } from '../models/user.model';
import { LoginModel } from '../models/login.model';
import { TokenModel } from '../models/token.model';
import { ApiDataModel } from '../models/apiData.model';
// Services
import { TokenService } from 'src/app/services/token.service';
import { UsersAPIService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAttemptsService {
  private indexEmail: number = -1;
  private usersEmails: string[] = [];
  private emailsFromAPI: string[] = [];
  private attemptsPerEmail: number[] = [];
  private subscriptions: Subscription = new Subscription();
  private login: LoginModel = {email: 'juan.chavez@neoris.com', password: '!Qazxsw2'};

  constructor(private tokenService: TokenService, private usersService: UsersAPIService) {
    // this.getEmailsFromAPI();
  }

  private getEmailsFromAPI(): void {
    localStorage.clear();
    const subscription: Subscription = this.tokenService.getToken(this.login).subscribe(
      (tokenResponse: TokenModel) => { localStorage.setItem(TOKEN, tokenResponse.accessToken); this.generateArrayOfEmails(); } );
    this.subscriptions.add(subscription);
  }
  private generateArrayOfEmails(): void{
    const subscription: Subscription = this.usersService.getRecords().subscribe(
      (apiData: ApiDataModel) => apiData.data.forEach( (user: UserModel) => this.emailsFromAPI.push(user.email)) );
    this.subscriptions.add(subscription);
  }
  private updateUsersEmails(userEmail: string): void{
    const index: number = this.usersEmails.indexOf(userEmail);
    if ( index >= 0) { ++this.attemptsPerEmail[index]; }
    else { this.usersEmails.push(userEmail); this.attemptsPerEmail.push(1); }
    this.indexEmail = this.usersEmails.indexOf(userEmail);
  }
  private generateObserverPerUserBlocked(): void {
    const newSubscription: Subscription = new Observable(observer => {
      const emailUser: string = this.usersEmails[this.indexEmail];
      alert(FAIL_ATTEMPTS);
      setTimeout( () => { this.deleteUserEmailByEmail(emailUser); observer.complete(); }, 30000 );
    }).subscribe( () => newSubscription.unsubscribe() );
  }
  private checkAttemptsPerEmail(userEmail: string): void {
    this.subscriptions.unsubscribe();
    this.updateUsersEmails(userEmail);
    if (this.attemptsPerEmail[this.indexEmail] >= 3) { this.generateObserverPerUserBlocked(); }
    else { alert(WRONG_LOGIN); }
  }
  checkIfEmailRegistered(userEmail: string): void {
    if (this.emailsFromAPI.includes(userEmail)) { this.checkAttemptsPerEmail(userEmail); }
    else { alert(WRONG_LOGIN); }
  }
  deleteUserEmailByEmail(userEmail: string): void{
    const index: number = this.usersEmails.indexOf(userEmail);
    if (index >= 0) {
      this.usersEmails.splice(index, 1);
      this.attemptsPerEmail.splice(index, 1);
    }
  }
  isUserEmailBlocked(userEmail: string): boolean {
    const index: number = this.usersEmails.indexOf(userEmail);
    return (index >= 0 && this.attemptsPerEmail[index] >= 3);
  }
}
