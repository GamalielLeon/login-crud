import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Constants
import { FAIL_ATTEMPTS, WRONG_FIELDS, WRONG_LOGIN, USER_BLOCKED } from 'src/app/constants/messages';
import { EMAIL_PATTERN, PASSWORD_LOGIN_PATTERN } from '../../constants/patterns';
import { TOKEN, ID_USER } from 'src/app/constants/localStorage-items';
import { USERS_LIST, HOME } from 'src/app/constants/paths';
import { ADMIN } from '../../constants/roles';
// Models
import { TokenModel } from '../../models/token.model';
import { RoleModel } from 'src/app/models/role.model';
import { UserModel } from '../../models/user.model';
// Services
import { CheckAttemptsService } from 'src/app/services/check-attempts.service';
import { RolesApiService } from 'src/app/services/roles-api.service';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  // Attributes
  private showPopUp: boolean = true;
  private subscriptions: Subscription = new Subscription();
  private messagePopUp: string = WRONG_FIELDS;
  // References
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService,
              private checkAttemptsService: CheckAttemptsService, private rolesService: RolesApiService,
              private usersService: UsersAPIService) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_LOGIN_PATTERN)]]
    });
    localStorage.clear();
  }
  ngOnInit(): void { document.body.style.backgroundImage = 'url("assets/images/bgImg0.jpg")'; }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.checkAttemptsService.deleteUserEmail(this.loginForm.controls.email.value);
  }
  /********** METHODS **********/
  checkSubmit(): void{
    if (this.loginForm.valid) { this.checkIsUserEmailBlocked(); }
    else { this.loginForm.markAllAsTouched(); }
  }
  private subscribeTokenService(): Subscription {
    return this.tokenService.getToken(this.loginForm.value).subscribe(
      (tokenData: TokenModel) => this.onSuccessToken(tokenData.accessToken),
      (errorServer) => this.onErrorToken(errorServer.error.message),
    );
  }
  private onSuccessToken(token: string): void {
    localStorage.setItem(TOKEN, token);
    this.navigateByUserRole();
  }
  private onErrorToken(errorMessage: string): void {
    const loginFormTemp = this.loginForm.controls;
    loginFormTemp.password.setValue('');
    alert(WRONG_LOGIN);
    if (errorMessage === USER_BLOCKED) {
      this.checkAttemptsService.addEmailBlocked(loginFormTemp.email.value);
    }
  }
  private getCurrentUserRole(currentUser: UserModel): void {
    this.rolesService.getRoles().subscribe((roles: RoleModel[]) => {
      localStorage.setItem(ID_USER, currentUser.id as string);
      const currentRole = roles.filter( (role: RoleModel) => role.id === currentUser.roleId )[0].name;
      this.router.navigateByUrl(currentRole === ADMIN ? USERS_LIST : HOME);
    });
  }
  private navigateByUserRole(): void {
    this.usersService.getUser().subscribe( (user: UserModel) => this.getCurrentUserRole(user) );
  }
  private checkIsUserEmailBlocked(): void {
    const loginFormTemp = this.loginForm.controls;
    if (this.checkAttemptsService.isUserEmailBlocked(loginFormTemp.email.value)) {
      alert(FAIL_ATTEMPTS);
      loginFormTemp.password.setValue('');
    } else {
      const subscriptionToken = this.subscribeTokenService();
      this.subscriptions.add(subscriptionToken);
    }
    /* const emailCurrentUser = this.loginForm.controls.email.value;
    this.tokenService.getToken({email: emailCurrentUser, password: ''}).
      subscribe( (resp) => this.subscribeTokenService(), (errorServer) => {
        if (errorServer.error.message === USER_BLOCKED) { alert(FAIL_ATTEMPTS); }
        else { this.subscribeTokenService(); }
      }); */
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

/* private navigateByUserRole(): void {
  const token: any = localStorage.getItem('token');
  const tokenDecrypted = JSON.parse(atob(token.split('.')[1]));
  this.router.navigateByUrl(
    tokenDecrypted[Object.keys(tokenDecrypted)[4]].
    toLowerCase().split('.')[1] === 'admin' ? USERS_LIST : HOME);
} */
