import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth/';
  private jwtHelper = new JwtHelperService();
  decodedToken: string;
  currentUser: User;
  currentPhoto: string;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private _http: HttpClient) {}

  changeCUrrentPhotoUrl(photoUrl: string){
    return this.photoUrl.next(photoUrl);
  }

  login(model: any): Observable<any> {
    return this._http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const loginToken = response;
        if (response) {
          localStorage.setItem('token', loginToken.token);
          localStorage.setItem('user', JSON.stringify(loginToken.user));
          this.decodedToken = this.jwtHelper.decodeToken(loginToken.token);
          this.currentUser = loginToken.user;
          this.currentPhoto = this.currentUser.photoUrl;
          this.changeCUrrentPhotoUrl(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user: User): Observable<any>{
    return this._http.post(this.baseUrl + 'register', user);
  }

  loggedIn(): boolean{
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
