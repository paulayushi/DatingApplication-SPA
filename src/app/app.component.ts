import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private jwtHelper= new JwtHelperService();
  user: User;

  constructor(private _authSvc: AuthService){};

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    this._authSvc.decodedToken = this.jwtHelper.decodeToken(token);
    if(this.user != null){
      //const userObj = JSON.parse(user);
      this._authSvc.currentPhoto = this.user.photoUrl;
      this._authSvc.changeCUrrentPhotoUrl(this._authSvc.currentPhoto);
    }
  }
}
