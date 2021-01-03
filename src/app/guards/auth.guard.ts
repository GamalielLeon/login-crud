import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { ID_USER } from 'src/app/constants/localStorage-items';
import { LOGIN } from '../constants/paths';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersAPIService, private router: Router) { }

  private onFailedToken(): Observable<boolean> {
    this.router.navigateByUrl(LOGIN);
    return of(false);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | UrlTree {
    return this.userService.getUser(localStorage.getItem(ID_USER) as string).
              pipe( map((user) => true), catchError((resp) => this.onFailedToken()) );
  }
}
