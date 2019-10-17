import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { EditUser } from 'src/app/models/edit-user';
import { Observable } from 'rxjs';
import { RegistrationFormData } from 'src/app/models/registration-form-data';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
    formData$: Observable<RegistrationFormData>;
    user: EditUser;
    changePasswordForm: FormGroup;
    changeLoginForm: FormGroup;
    changeNameForm: FormGroup;

    changeGenderForm: FormGroup;
    changeCountryForm: FormGroup;

    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private service: UserService) { }

    ngOnInit() {
        this.formData$ = this.service.getRegistrationFormData();
        this.service.getUser().subscribe(data => this.user = data);

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

        this.changeGenderForm = this.formBuilder.group({
            genderId: ['', [Validators.required]],
        });

        this.changeCountryForm = this.formBuilder.group({
            countryId: ['', [Validators.required]],
        });
    }
    get passForm() { return this.changePasswordForm.controls; }
    get loginForm() { return this.changeLoginForm.controls; }
    get nameForm() { return this.changeNameForm.controls; }
    get genderForm() { return this.changeGenderForm.controls; }
    get countryForm() { return this.changeCountryForm.controls; }

    
    samePass(): boolean {
        if (this.passForm.newPassword.value != this.passForm.newPasswordConfirm.value)
            return false;
        return true;
    }
    onPasswordSubmit() {
        this.submitted = true;

        if (this.changePasswordForm.invalid) {
            return;
        }

        this.loading = true;

        this.user.oldPassword = this.passForm.oldPassword.value;
        this.user.password = this.passForm.newPassword.value;

        this.service.update(this.user)
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
        this.user.userName = this.loginForm.newLogin.value;
        this.service.update(this.user)
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
        this.user.fullName = this.nameForm.newName.value;
        this.service.update(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
    onGenderSubmit() {
        this.submitted = true;

        if (this.changeGenderForm.invalid) {
            return;
        }

        this.loading = true;
        this.user.genderId = this.genderForm.genderId.value;
        this.service.update(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
    onCountrySubmit() {
        this.submitted = true;

        if (this.changeGenderForm.invalid) {
            return;
        }

        this.loading = true;
        this.user.countryId = this.countryForm.countryId.value;
        this.service.update(this.user)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }
}
