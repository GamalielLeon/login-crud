import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ID_USER, PAGE, TOKEN } from 'src/app/constants/localStorage-items';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { LOGIN, MAIN } from 'src/app/constants/paths';

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
  private loggedIn: boolean = false;
  private loading: boolean = true;

  constructor(private usersService: UsersAPIService, private router: Router) {
    this.subscriptions.add(this.showImagesBgObs().subscribe());
    this.subscriptions.add( this.usersService.getUser().subscribe(
      (user: UserModel) => this.ifUserLoggedIn(), () => this.setLoading(false)) );
  }
  ngOnInit(): void { }
  ngOnDestroy(): void {
    // Unsubscribe from the observable and clear the setInterval function inside the observable.
    this.subscriptions.unsubscribe();
    clearInterval(this.refSetIntervalShowImagesObs);
  }
  /********** METHODS **********/
  ifUserLoggedIn(): void {
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
  /********** GETTERS **********/
  getUserLoggedIn = (): boolean => this.loggedIn;
  getTextButton = (): string => this.textButton;
  getLoading = (): boolean => this.loading;
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
