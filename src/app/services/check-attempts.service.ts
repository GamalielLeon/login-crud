import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { UsersAPIService } from './users-api.service';
import { UserModel } from '../models/user.model';
import { LoginModel } from '../models/login.model';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class CheckAttemptsService {
  private indexEmail: number = -1;
  private usersEmails: string[] = [];
  private attemptsPerEmail: number[] = [];
  private emailsFromAPI: string[] = [];
  private subscriptions: Subscription = new Subscription();
  private login: LoginModel = {email: 'juan.chavez@neoris.com', password: '!Qazxsw2'};

  constructor(private tokenService: TokenService, private usersService: UsersAPIService) {
    this.getEmailsFromAPI();
  }

  private getEmailsFromAPI(): void {
    localStorage.clear();
    const subscription: Subscription = this.tokenService.getToken(this.login).subscribe(
      (tokenResponse: TokenModel) => {localStorage.setItem('token', tokenResponse.accessToken); this.generateArrayOfEmails(); } );
    this.subscriptions.add(subscription);
  }
  private generateArrayOfEmails(): void{
    const subscription: Subscription = this.usersService.getUsers().subscribe(
      (users: UserModel[]) => users.forEach( (user: UserModel) => this.emailsFromAPI.push(user.email)) );
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
      alert('Ha superado el máximo de intentos, intente de nuevo en 15 minutos.');
      setTimeout( () => { this.deleteUserEmailByEmail(emailUser); observer.complete(); }, 30000 );
    }).subscribe( () => newSubscription.unsubscribe() );
  }
  private checkAttemptsPerEmail(userEmail: string): void {
    this.subscriptions.unsubscribe();
    this.updateUsersEmails(userEmail);
    if (this.attemptsPerEmail[this.indexEmail] >= 3) { this.generateObserverPerUserBlocked(); }
    else { alert('¡Credenciales incorrectas!'); }
  }
  checkIfEmailRegistered(userEmail: string): void {
    if (this.emailsFromAPI.includes(userEmail)) { this.checkAttemptsPerEmail(userEmail); }
    else { alert('¡Credenciales incorrectas!'); }
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
