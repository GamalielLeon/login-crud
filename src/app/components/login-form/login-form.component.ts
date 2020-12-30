import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Constants
import { USERS_LIST } from 'src/app/constants/paths';
import { EMAIL_PATTERN, PASSWORD_LOGIN_PATTERN } from '../../constants/patterns';
// Services
import { CheckAttemptsService } from 'src/app/services/check-attempts.service';
import { TokenService } from 'src/app/services/token.service';
import { TokenModel } from '../../models/token.model';
import { HOME } from '../../constants/paths';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  // Attributes
  private showPopUp: boolean = true;
  private subscriptions: Subscription = new Subscription();
  private messagePopUp: string = 'Algunos campos no fueron llenados correctamente.';
  // References
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService,
              private checkAttemptsService: CheckAttemptsService) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_LOGIN_PATTERN)]]
    });
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/bgImg0.jpg")'; }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.checkAttemptsService.deleteUserEmailByEmail(this.loginForm.controls.email.value);
  }
  /********** METHODS **********/
  checkSubmit(): void{
    if (this.loginForm.valid) { this.checkIsUserEmailBlocked(); }
    else { this.loginForm.markAllAsTouched(); }
  }
  private subscribeTokenService(): Subscription {
    return this.tokenService.getToken(this.loginForm.value).subscribe(
      (tokenData: TokenModel) => localStorage.setItem('token', tokenData.accessToken),
      (error) => this.onErrorToken(),
      () => this.navigateByUserRole()
    );
  }
  private onErrorToken(): void {
    this.loginForm.controls.password.setValue('');
    this.checkAttemptsService.checkIfEmailRegistered(this.loginForm.controls.email.value);
  }
  private navigateByUserRole(): void {
    const token: any = localStorage.getItem('token');
    const tokenDecrypted = JSON.parse(atob(token.split('.')[1]));
    this.router.navigateByUrl(
      tokenDecrypted[Object.keys(tokenDecrypted)[4]].
      toLowerCase().split('.')[1] === 'admin' ? USERS_LIST : HOME);
  }
  private checkIsUserEmailBlocked(): void {
    if (this.checkAttemptsService.isUserEmailBlocked(this.loginForm.controls.email.value)) {
      alert('Ha superado el máximo de intentos, intente de nuevo en 15 minutos.');
      this.loginForm.controls.password.setValue('');
    } else {
      const subscriptionToken = this.subscribeTokenService();
      this.subscriptions.add(subscriptionToken);
    }
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.loginForm.controls[fieldName];
    return field.invalid && field.touched;
  }
  /********** GETTERS **********/
  getMessagePopUp = (): string => this.messagePopUp;
  getShowPopUp = (): boolean => this.showPopUp;
  /********** SETTERS **********/
  setMessagePopUp(message: string): void { this.messagePopUp = message; }
  setShowPopUp(showPopUp: boolean): void { this.showPopUp = showPopUp; }
}
