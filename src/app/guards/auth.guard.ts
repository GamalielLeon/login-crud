import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersAPIService } from 'src/app/services/users-api.service';
import { LOGIN } from '../constants/paths';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

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
    return this.userService.getRecords(1).pipe( map(() => true), catchError(() => this.onFailedToken()) );
  }
}
