import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth/';
  private jwtHelper = new JwtHelperService();
  decodedToken: string;

  constructor(private _http: HttpClient) {}

  login(model: any): Observable<any> {
    return this._http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const loginToken = response;
        if (response) {
          localStorage.setItem('token', loginToken.token);
          this.decodedToken = this.jwtHelper.decodeToken(loginToken.token);
        }
      })
    );
  }

  register(model:any): Observable<any>{
    return this._http.post(this.baseUrl + 'register', model);
  }

  loggedIn(): boolean{
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
