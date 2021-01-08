import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersAPIService } from '../services/users-api.service';
import { TOKEN } from '../constants/localStorage-items';
import { HOME } from '../constants/paths';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {
  constructor(private usersService: UsersAPIService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const tokenOnLocalStorage: boolean = localStorage.getItem(TOKEN) === null;
      if (!tokenOnLocalStorage) { this.router.navigateByUrl(HOME); }
      return tokenOnLocalStorage;
  }
}
