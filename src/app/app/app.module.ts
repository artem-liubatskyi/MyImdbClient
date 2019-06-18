import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { MoviesService } from '../services/movies.service';
import { AppComponent } from './app.component';
import { MovieModule } from '../components/movie.module';
import { SearchComponent } from '../layout/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication-service';
import { UserService } from '../services/user.service';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { JwtInterceptor } from '../helpers/jwt-interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { AuthGuard } from '../helpers/auth-guard';
import { UserPageComponent } from '../components/user-page/user-page.component';
import { AppConfig } from '../config/config';
import { CommonModule } from '@angular/common';
import { RestorePasswordComponent } from '../components/restore-password/restore-password.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { AppRoutingModule } from '../routing/app-routing.module';

export function tokenGetter() {
  let currentUser = JSON.parse(localStorage.getItem(AppConfig.user));
        if(currentUser==null)
            return false;
       return currentUser.token;     
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    AccountSettingsComponent,
    UserPageComponent,
    RestorePasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MovieModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
  ],
  providers: [
    AuthGuard,
    AuthenticationService, 
    UserService,
    MoviesService,
  { 
    provide: HTTP_INTERCEPTORS, 
    useClass: JwtInterceptor, 
    multi: true 
  },
],
  bootstrap: [AppComponent]
})
export class AppModule {}