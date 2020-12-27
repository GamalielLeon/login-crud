import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL_TOKEN } from '../constants/urls';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private headers: HttpHeaders = new HttpHeaders({
    Accept: 'text/plain',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  constructor(private http: HttpClient) { }

  getToken(tokenModel: LoginModel): Observable<TokenModel> {
    const bodyRequest = `username=${tokenModel.email}&password=${tokenModel.password}`;
    return this.http.post<TokenModel>(API_URL_TOKEN, bodyRequest, {headers: this.headers});
  }
}
