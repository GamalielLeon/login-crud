import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ID_USER, PAGE, TOKEN } from 'src/app/constants/localStorage-items';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { Router } from '@angular/router';
import { LOGIN } from 'src/app/constants/paths';
import { RolesApiService } from '../../services/roles-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Attributes
  private subscriptions: Subscription = new Subscription();
  private refSetIntervalShowImagesObs: any;
  private textButton: string = 'Ingresar';
  private currentRole: string = '';
  private loggedIn: boolean = false;
  private loading: boolean = true;

  constructor(private usersService: UsersAPIService, private router: Router,
              private rolesService: RolesApiService) {
    this.subscriptions.add(this.showImagesBgObs().subscribe());
    this.subscriptions.add(this.usersService.getUser().
      subscribe( user => this.ifUserLoggedIn(), error => this.setLoading(false) ));
  }
  ngOnInit(): void { }
  ngOnDestroy(): void {
    // Unsubscribe from the observable and clear the setInterval function inside the observable.
    this.subscriptions.unsubscribe();
    clearInterval(this.refSetIntervalShowImagesObs);
  }
  /********** METHODS **********/
  ifUserLoggedIn(): void {
    this.getCurrentUserRole();
    this.setTextButton('Cerrar sesión');
    this.loggedIn = true;
    this.setLoading(false);
  }
  logInOut(): void {
    if (this.getUserLoggedIn()) {
      localStorage.removeItem(PAGE);
      localStorage.removeItem(ID_USER);
      localStorage.removeItem(TOKEN);
      window.location.reload();
    }
    else { this.router.navigateByUrl(LOGIN); }
  }
  getCurrentUserRole(): void {
    this.usersService.getUser().subscribe( user => {
      this.rolesService.getRoles().
        subscribe(roles => this.currentRole = roles.filter(role => role.id === user.roleId)[0].name);
    });
  }
  /********** GETTERS **********/
  getUserLoggedIn = (): boolean => this.loggedIn;
  getTextButton = (): string => this.textButton;
  getLoading = (): boolean => this.loading;
  getCurrentRole = (): string => this.currentRole;
  /********** SETTERS **********/
  setTextButton(text: string): void { this.textButton = text; }
  setLoading(loading: boolean): void { this.loading = loading; }

  // Method that changes the background image, using an observable.
  private showImagesBgObs(): Observable<string> {
    let indexImage = 0;
    return new Observable<string>( observer => {
      this.refSetIntervalShowImagesObs = setInterval( () => {
        const bgImage = document.body.style.backgroundImage = `url(assets/images/bgImg${++indexImage}.jpg)`;
        observer.next(bgImage);
        indexImage &= 3;
      }, 4000);
    });
  }
}
