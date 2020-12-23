import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckAttemptsService {
  private attempts: number = 0;
  private userEmailBlocked: string = '';

  constructor() { }

  getUserEmailBlocked = (): string => this.userEmailBlocked;
  getAttempts = (): number => this.attempts;

  setUerEmailBlocked(userEmail: string): void { this.userEmailBlocked = userEmail; }
  setAttempts(): void {
    if (++this.attempts >= 3) {
      this.attempts = 3;
      setTimeout(() => this.attempts = 0, 10000);
    }
  }
}
