import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { RegistrationFormData } from 'src/app/models/registration-form-data';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    formData$: Observable<RegistrationFormData>;
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private service: UserService) { }

    ngOnInit() {
        this.formData$ = this.service.getRegistrationFormData();
        this.registerForm = this.formBuilder.group({
            fullName: ['', Validators.required],
            login: ['', Validators.required],
            eMail: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            countryId: [''],
            genderId: [''],
            about: [''],
            dateOfBirth: [''],
        });
    }
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.service.register(this.registerForm.value)
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
