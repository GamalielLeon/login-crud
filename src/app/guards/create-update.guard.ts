import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ROLES } from '../constants/localStorage-items';
import { USERS_LIST } from '../constants/paths';

@Injectable({
  providedIn: 'root'
})
export class CreateUpdateGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const rolesOnLocalStorage = localStorage.getItem(ROLES) !== null;
      if (!rolesOnLocalStorage) { this.router.navigateByUrl(USERS_LIST); }
      return rolesOnLocalStorage;
    }
}
