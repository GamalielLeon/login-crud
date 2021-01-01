import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
// Services
import { UsersAPIService } from 'src/app/services/users-api.service';
import { RolesApiService } from '../services/roles-api.service';
// Constants
import { HOME } from '../constants/paths';
import { ADMIN } from '../constants/roles';
// Models
import { RoleModel } from '../models/role.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersAPIService, private rolesService: RolesApiService,
              private router: Router) { }

  private getCurrentUserRole(currentUser: UserModel, observerRef: Subscriber<boolean>): void {
    this.rolesService.getRoles().subscribe((roles: RoleModel[]) => {
      const currentRole = roles.filter( (role: RoleModel) => role.id === currentUser.roleId )[0].name;
      const isRoleAdmin: boolean = currentRole === ADMIN;
      observerRef.next(isRoleAdmin);
      if (!isRoleAdmin) { this.router.navigateByUrl(HOME); }
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.usersService.getUser().subscribe(user => this.getCurrentUserRole(user, observer));
    });
  }
}
