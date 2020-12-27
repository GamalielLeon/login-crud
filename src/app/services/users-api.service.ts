import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL_USERS } from '../constants/urls';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { ApiDataModel } from '../models/apiData.model';

@Injectable({
  providedIn: 'root'
})
export class UsersAPIService {

  constructor(private http: HttpClient) { }

  private generateHttpHeader(): HttpHeaders {
    return new HttpHeaders({Authorization: `Bearer ${this.getTokenFromLocalStorage()}`});
  }
  private getTokenFromLocalStorage = (): string|null => localStorage.getItem('token');
  getUsers(): Observable<UserModel[]> {
    return this.http.get<ApiDataModel>(API_URL_USERS, {headers: this.generateHttpHeader()}).
    pipe( map((apiData: ApiDataModel) => apiData.data) );
  }
}
