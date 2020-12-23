import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL_TOKEN } from '../constants/urls';
import { TokenModel } from '../models/token.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private headers: HttpHeaders = new HttpHeaders({
    Accept: 'text/plain',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  constructor(private http: HttpClient) { }

  getToken(tokenModel: TokenModel): any {
    const bodyRequest = `Username=${tokenModel.Username}&Password=${tokenModel.Password}`;
    return this.http.post(API_URL_TOKEN, bodyRequest, {headers: this.headers}).pipe( tap(console.log) );
  }
}
