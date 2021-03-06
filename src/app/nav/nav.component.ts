import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public _authSvc: AuthService, private alerify: AlertifyService, private router: Router) {}

  ngOnInit() {
    this._authSvc.currentPhotoUrl.subscribe( url => {
      this.photoUrl = url;
    });
  }

  login() {
    this._authSvc.login(this.model).subscribe(
      next => {
        this.router.navigate(['members']);
        this.alerify.success('Logged in successfully.');
      },
      error => {
        this.alerify.error(error);
      }
    );
  }

  loggedIn(): boolean {
    return this._authSvc.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
    localStorage.removeItem('photoUrl');
    this.alerify.message('Logged out successfully.');
  }
}
