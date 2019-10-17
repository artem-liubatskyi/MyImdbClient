import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, catchError, finalize } from 'rxjs/operators';
import { AppConfig } from '../config/config';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, ) { }

    public isAuthenticated(): boolean {
        const currentUser = JSON.parse(localStorage.getItem(AppConfig.user));

        if (currentUser == null) {
            return false;
        } else {
            return this.refresh();
        }
        return true;
    }
    refresh(): boolean {

        let flag = true;
        this.refreshToken()
            .pipe(
                switchMap((user: User) => {
                    if (user) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }

                    return user as any;
                }),
                catchError(err => {
                    flag = false;
                    return null as any;
                })
            );
        return flag;

    }
    user(): User {
        return JSON.parse(localStorage.getItem(AppConfig.user));
    }
    login(login: string, password: string): Observable<User> {
        return this.http.post<User>(AppConfig.authentication, { login, password })
            .pipe(map((user: User) => {
                if (user && user.accessToken) {
                    localStorage.setItem(AppConfig.user, JSON.stringify(user));
                }
                return user;
            }));
    }
    logout() {
        localStorage.removeItem(AppConfig.user);
    }
    refreshToken(): Observable<User> {

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        return this.http.post<User>(AppConfig.refresh, { token: currentUser.accessToken, refreshToken: currentUser.refreshToken })
            .pipe(
                map(user => {
                    return user;
                }));
    }

    getAuthToken(): string {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser != null) {
            return currentUser.accessToken;
        }
    }
}
