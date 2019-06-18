import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {

  hash: string;
  restorePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService) { }

  ngOnInit() {
    this.hash = this.route.snapshot.paramMap.get('hash');

    this.restorePasswordForm = this.formBuilder.group({
      newPasswordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get passForm() { return this.restorePasswordForm.controls; }

  samePass(): boolean {
    if (this.passForm.newPassword.value != this.passForm.newPasswordConfirm.value)
      return false;
    return true;
  }
  onSubmit() {
    this.submitted = true;

    if (this.restorePasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.service.restorePassword(this.hash, this.restorePasswordForm.controls['newPassword'].value)
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
