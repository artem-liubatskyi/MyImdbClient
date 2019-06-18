import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService) { }

  get f(){ return this.emailForm.controls; }
  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required],
  });
}
  onSubmit(){
    this.submitted = true;

      if (this.emailForm.invalid) {
          return;}

      this.loading = true;
      this.service.restorePasswordRequest(this.emailForm.value).subscribe(ok => {
        console.log("ok");
        debugger;
      });
      // this.service.restorePasswordRequest(this.emailForm.value)
      //     .pipe(first())
      //     .subscribe(
      //           data => {
      //               this.router.navigate([this.returnUrl]);
      //           },
      //           error => {
      //               this.loading = false;
      //           });
  }
}
