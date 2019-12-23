import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authSvc: AuthService, private router: Router, private alertify: AlertifyService) {};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this._authSvc.loggedIn()) {
        return true;
    }
      this.alertify.error('You are not allowed to navigate to this page. Please login to navigate!');
      this.router.navigate(['home']);
      return false;
  }
}
