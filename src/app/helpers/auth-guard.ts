import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppConfig } from '../config/config';
import { AuthenticationService } from '../services/authentication-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authService: AuthenticationService) {}

  canActivate() {

    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate([AppConfig.unauthorizedUrl]);
    return false;
  }
}