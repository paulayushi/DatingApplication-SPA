import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  private jwtHelper= new JwtHelperService();

  constructor(private _authSvc: AuthService){};

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this._authSvc.decodedToken = this.jwtHelper.decodeToken(token);
  };
}
