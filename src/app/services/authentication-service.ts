import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppConfig } from '../config/config';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

    public isAuthenticated(): boolean {
        let currentUser = JSON.parse(localStorage.getItem(AppConfig.user));
        if (currentUser == null)
            return false;
        return !this.jwtHelper.isTokenExpired(currentUser.token);
    }
    user(): User {
        return JSON.parse(localStorage.getItem(AppConfig.user));
    }
    login(login: string, password: string): Observable<User> {
        return this.http.post<User>(AppConfig.authentication, { login: login, password: password })
            .pipe(map((user: User) => {
                if (user && user.token) {
                    localStorage.setItem(AppConfig.user, JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem(AppConfig.user);
    }
}