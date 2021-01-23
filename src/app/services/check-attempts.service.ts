import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckAttemptsService {
  private usersEmails: string[] = [];
  private TIMEOUT: number = 60 * 1000;

  constructor() { }

  private generateObserverPerUserBlocked(userEmail: string): void {
    const newSubscription: Subscription = new Observable(observer => {
      const emailBlocked: string = userEmail;
      setTimeout(() => { this.deleteUserEmail(emailBlocked); observer.complete(); }, this.TIMEOUT);
    }).subscribe(() => newSubscription.unsubscribe());
  }
  deleteUserEmail(userEmail: string): void{
    const index: number = this.usersEmails.indexOf(userEmail);
    if (index >= 0) { this.usersEmails.splice(index, 1); }
  }
  isUserEmailBlocked = (userEmail: string): boolean => this.usersEmails.includes(userEmail);
  addEmailBlocked(userEmail: string): void {
    if (!this.usersEmails.includes(userEmail)) {
      this.usersEmails.push(userEmail);
      this.generateObserverPerUserBlocked(userEmail);
    }
  }
}
