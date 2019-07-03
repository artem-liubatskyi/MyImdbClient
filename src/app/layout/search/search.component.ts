import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { FormControl } from '@angular/forms';
import { MovieList } from 'src/app/models/movie-list';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { Observable, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  loading = false;
  movies$: Observable<MovieList[]>;
  movies: MovieList[];
  findControl = new FormControl();

  constructor(private moviesService: MoviesService, private authService: AuthenticationService) { }

  onChange() {
    this.loading = true;
    this.moviesService.getBySerchQuery(this.findControl.value).pipe(first())
      .subscribe(data => {
        this.movies = data;
        this.loading = false;
      },
        error => {
          this.loading = false;
        });
  }
  ngOnInit() {
    this.findControl.valueChanges.subscribe(data=>this.onChange());
  }
  submit() {
    this.findControl.setValue("");
  }
}
