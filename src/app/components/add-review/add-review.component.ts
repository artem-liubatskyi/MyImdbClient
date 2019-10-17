import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/services/movies.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication-service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  @Input() movieId: number;
  addForm: FormGroup;
  submitted = false;
  status = null;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private service: MoviesService) { }

  get f() { return this.addForm.controls; }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(20)]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid)
      return
    this.service.addReview(this.movieId, this.f.text.value).pipe(first())
      .subscribe(
        data => {
          this.submitted = false;
          this.f.text.setValue('');
          this.status = true;
        },
        error => {
          this.submitted = false;
          this.f.text.setValue('');
          this.status = false;
        });
  }
}
