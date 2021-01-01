import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { UsersAPIService } from 'src/app/services/users-api.service';
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
    state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.getUser().pipe( map(() => true), catchError(() => this.onFailedToken()) );
  }
}
