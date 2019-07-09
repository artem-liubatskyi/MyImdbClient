import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService) { }
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    intercept(request: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

        return next.handle(this.addTokenToRequest(request, this.authService.getAuthToken()))
            .pipe(
                catchError(err => {
                    if (err instanceof HttpErrorResponse) {
                        switch ((<HttpErrorResponse>err).status) {
                            case 401:
                                return this.handle401Error(request, next);
                            case 400:
                                return <any>this.authService.logout();
                        }
                    } else {
                        return throwError(err);
                    }
                }));
    }

    private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            this.tokenSubject.next(null);

            return this.authService.refreshToken()
                .pipe(
                    switchMap(user => {
                        if (user) {
                            console.log(user);
                            this.tokenSubject.next(user.accessToken);
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            return next.handle(this.addTokenToRequest(request, user.accessToken));
                        }

                        return <any>this.authService.logout();
                    }),
                    catchError(err => {
                        console.log(err);
                        return <any>this.authService.logout();
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    })
                );
        } else {
            this.isRefreshingToken = false;

            return this.tokenSubject
                .pipe(filter(token => token != null),
                    take(1),
                    switchMap(token => {
                        return next.handle(this.addTokenToRequest(request, token));
                    }));
        }
    }
}