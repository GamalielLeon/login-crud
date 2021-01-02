import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsersAPIService } from '../services/users-api.service';
import { ID_USER } from '../constants/localStorage-items';
import { REGISTER } from '../constants/paths';

@Injectable({
  providedIn: 'root'
})
export class UserCreatedGuard implements CanActivate {
  constructor(private usersService: UsersAPIService, private router: Router) { }

  private onFailedIdUser(): Observable<boolean> {
    this.router.navigateByUrl(REGISTER);
    return of(false);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.usersService.getUser(localStorage.getItem(ID_USER) as string).
            pipe( map(() => true), catchError(() => this.onFailedIdUser()) );
  }
}
