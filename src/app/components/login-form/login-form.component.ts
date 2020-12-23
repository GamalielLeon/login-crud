import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { USERS_LIST } from 'src/app/constants/paths';
import { CheckAttemptsService } from 'src/app/services/check-attemps.service';
import { TokenService } from 'src/app/services/token.service';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '../../constants/patterns';

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
              private checkAttempts: CheckAttemptsService) {
    this.loginForm = formBuilder.group({
      // Required, only admits alphanumerics and must have btw 6 to 12 characters.
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]]
    });
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/bgImg0.jpg")'; }
  ngOnDestroy(): void { this.subscriptions.unsubscribe(); }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.loginForm.valid) {
      const subscriptionToken = this.subscribeTokenService();
      this.subscriptions.add(subscriptionToken);
    } else { this.loginForm.markAllAsTouched(); }
  }
  private subscribeTokenService(): Subscription {
    return this.tokenService.getToken(this.loginForm.value).subscribe(
      (tokenData: any) => localStorage.setItem('token', tokenData.accessToken),
      () => { alert('¡Credenciales incorrectas!'); },
      () => { this.router.navigateByUrl(USERS_LIST); }
      );
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
