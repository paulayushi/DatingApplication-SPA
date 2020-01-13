import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userSvc: UserService, private alertify: AlertifyService, private router: Router,
                private authSvc: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userSvc.getUser(this.authSvc.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('There seems to be problem in retrieving your data.' + error);
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
