import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieList } from 'src/app/models/movie-list';

@Component({
  selector: 'app-movie-top',
  templateUrl: './movie-top.component.html',
  styleUrls: ['./movie-top.component.css']
})
export class MovieTopComponent implements OnInit {
  top$: Observable<MovieList[]>;
  constructor(
    private service: MoviesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.top$ = this.service.getTop();
  }
  gotoMovie(movie: MovieList) {
    let movieId = movie ? movie.id : null;
    this.router.navigate(['/movie', { id: movieId }]);
  }
}
