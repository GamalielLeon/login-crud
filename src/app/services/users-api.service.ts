import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ApiDataModel } from '../models/apiData.model';
import { API_URL_USERS } from '../constants/urls';
import { TOKEN } from '../constants/localStorage-items';

@Injectable({
  providedIn: 'root'
})
export class UsersAPIService {

  constructor(private http: HttpClient) { }

  private generateHttpHeader(): HttpHeaders {
    return new HttpHeaders(
      {Authorization: `Bearer ${this.getTokenFromLocalStorage()}`, 'Content-Type': 'application/json'});
  }
  private getTokenFromLocalStorage = (): string|null => localStorage.getItem(TOKEN);

  getRecords(pageNumber: number = 1, pageSize: number = 10): Observable<ApiDataModel> {
    return this.http.get<ApiDataModel>(
      `${API_URL_USERS}?PageNumber=${pageNumber}&PageSize=${pageSize}`, {headers: this.generateHttpHeader()});
  }
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(API_URL_USERS, user, {headers: this.generateHttpHeader()});
  }
  updateUser(user: UserModel, status?: boolean): Observable<UserModel> {
    const userTemp: UserModel = {...user};
    if (arguments.length === 2) { userTemp.active = status; }
    return this.http.put<UserModel>(`${API_URL_USERS}/${user.id}`, userTemp, {headers: this.generateHttpHeader()});
  }
  getUser(userId: string = 'Mine'): Observable<UserModel> {
    return this.http.get<UserModel>(`${API_URL_USERS}/${userId}`, {headers: this.generateHttpHeader()});
  }

  recoverPassword(): void {}
  updatePassword(userId: string, newPassword: string): Observable<object> {
    return this.http.put<object>(`${API_URL_USERS}/UpdatePassword/${userId}`,
      {password: newPassword}, {headers: this.generateHttpHeader()});
  }
}
