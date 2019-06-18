import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserPageComponent } from '../components/user-page/user-page.component';
import { AccountSettingsComponent } from '../components/account-settings/account-settings.component';
import { AuthGuard } from '../helpers/auth-guard';
import { RestorePasswordComponent } from '../components/restore-password/restore-password.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { SelectivePreloadingStrategyService } from '../app/selective-preloading-strategy.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path: 'restoring-password/:hash', component: RestorePasswordComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  {
    path: 'user-page',
    component: UserPageComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'user-settings',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        preloadingStrategy: SelectivePreloadingStrategyService,
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }