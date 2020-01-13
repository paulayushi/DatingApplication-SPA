import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userSvc: UserService, private alertify: AlertifyService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        const pageNumber = 1;
        const pageSize = 5;
        return this.userSvc.getUsers(pageNumber, pageSize).pipe(
            catchError(error => {
                this.alertify.error('There seems to be problem in retrieving users data.' + error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
