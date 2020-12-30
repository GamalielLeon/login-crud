import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL_ROLES } from '../constants/urls';
import { RoleModel } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RolesApiService {

  constructor(private http: HttpClient) { }

  private generateHttpHeader(): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`, 'Content-Type': 'application/json'});
  }
  private getTokenFromLocalStorage = (): string|null => localStorage.getItem('token');

  getRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(API_URL_ROLES, {headers: this.generateHttpHeader()});
  }
  createRole(role: RoleModel): Observable<RoleModel> {
    return this.http.post<RoleModel>(API_URL_ROLES, role, {headers: this.generateHttpHeader()});
  }
}
