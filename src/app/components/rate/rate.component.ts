import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication-service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  @Input() rate: number;
  @Input() movieId: number;
  loading = false;
  constructor(private movieService: MoviesService, private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.rate == null)
      this.rate = 0;
  }
  onChange(num: number) {
    this.loading = true;
    this.rate = num;
    this.movieService.addRate(this.movieId, this.rate).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.loading = false;
        });;
  }
}
