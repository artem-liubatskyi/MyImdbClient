import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { EditUser } from 'src/app/models/edit-user';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  changePasswordForm: FormGroup;
  changeLoginForm: FormGroup;
  changeNameForm: FormGroup;

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: UserService) 
  { }

    ngOnInit() {
        this.changePasswordForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required]],
            newPasswordConfirm: ['', [Validators.required, Validators.minLength(6)]],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.changeLoginForm = this.formBuilder.group({
            newLogin: ['', [Validators.required]],
        });
        this.changeNameForm = this.formBuilder.group({
            newName: ['', [Validators.required]],
        });
    }
    get passForm() { return this.changePasswordForm.controls; }
    get loginForm() { return this.changeLoginForm.controls; }
    get nameForm() { return this.changeNameForm.controls; }

    samePass() : boolean
    {
        if(this.passForm.newPassword.value!= this.passForm.newPasswordConfirm.value)
            return false;
        return true;
    }
    onPasswordSubmit() {
        this.submitted = true;

        if (this.changePasswordForm.invalid) {
            return;
        }

        this.loading = true;
        this.service.update(this.changePasswordForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
    onLoginSubmit() {
        this.submitted = true;

        if (this.changeLoginForm.invalid) {
            return;
        }

        this.loading = true;
        this.service.update(this.changeLoginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
    onNameSubmit() {
        this.submitted = true;

        if (this.changeNameForm.invalid) {
            return;
        }

        this.loading = true;
        this.service.update(this.changeNameForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
    click()
    {
        
    }
}
