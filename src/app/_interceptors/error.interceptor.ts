import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError( error => {
                if(error.status === 401){
                    return throwError(error.statusText);
                }

                if(error instanceof HttpErrorResponse){
                    const applicationError = error.headers.get('ApplicationError');
                    if(applicationError){
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    let modalErrors = '';
                    if(serverError && serverError.errors && typeof(serverError.errors) === 'object'){
                        for(const key in serverError.errors){
                            if(serverError.errors[key]){
                                modalErrors += serverError.errors[key] + '\n';
                            }
                        }
                    }

                    return throwError(modalErrors || serverError || 'Other server error.');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
