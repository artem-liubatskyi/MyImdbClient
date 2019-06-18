import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieList } from 'src/app/models/movie-list';
import { AuthenticationService } from 'src/app/services/authentication-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies$: Observable<MovieList[]>;
  findControl = new FormControl();

  constructor(private moviesService: MoviesService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.movies$ = this.findControl.valueChanges.pipe(
      switchMap(value => this.moviesService.getBySerchQuery(value)));
  }
  submit() {
    this.findControl.setValue("");
  }
}
