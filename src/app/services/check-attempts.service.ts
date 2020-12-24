import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckAttemptsService {
  private usersEmails: string[] = [];
  private attemptsPerEmail: number[] = [];
  private indexEmail: number = -1;

  constructor() { }

  private updateUsersEmails(userEmail: string): void{
    const index = this.usersEmails.indexOf(userEmail);
    if ( index >= 0) { ++this.attemptsPerEmail[index]; }
    else { this.usersEmails.push(userEmail); this.attemptsPerEmail.push(1); }
    this.indexEmail = this.usersEmails.indexOf(userEmail);
  }
  private deleteUserEmailByIndex(index: number): void{
    this.usersEmails.splice(index, 1);
    this.attemptsPerEmail.splice(index, 1);
  }
  checkAttemptsEmail(userEmail: string): void {
    this.updateUsersEmails(userEmail);
    if (this.attemptsPerEmail[this.indexEmail] >= 3) {
      const newSubscription = new Observable(observer => {
        const index = this.indexEmail;
        alert('Ha superado el máximo de intentos, intente de nuevo en 15 minutos.');
        setTimeout( () => { this.deleteUserEmailByIndex(index); observer.complete(); }, 40000 );
      }).subscribe( () => newSubscription.unsubscribe() );
     } else { alert('¡Credenciales incorrectas!'); }
  }
  deleteUserEmailByEmail(userEmail: string): void{
    const index = this.usersEmails.indexOf(userEmail);
    if (index >= 0) {
      this.usersEmails.splice(index, 1);
      this.attemptsPerEmail.splice(index, 1);
    }
  }
  isUserEmailBlocked(userEmail: string): boolean {
    const index = this.usersEmails.indexOf(userEmail);
    return (index >= 0 && this.attemptsPerEmail[index] >= 3);
  }
}
