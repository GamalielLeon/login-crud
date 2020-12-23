import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL_TOKEN } from '../constants/urls';
import { TokenModel } from '../models/token.model';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private headers: HttpHeaders = new HttpHeaders({
    Accept: 'text/plain',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  constructor(private http: HttpClient) { }

  getToken(tokenModel: TokenModel): Observable<object> {
    const bodyRequest = `username=${tokenModel.email}&password=${tokenModel.password}`;
    return this.http.post(API_URL_TOKEN, bodyRequest, {headers: this.headers});
  }
}
