import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { AppConfig } from '../config/config';
import { Observable } from 'rxjs';
import { MovieList } from '../models/movie-list';

@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) { }

  getById(id: number | string): Observable<Movie> {
    return this.http.get<Movie>(AppConfig.movieByid + id);
  }
  getBySerchQuery(serachQuery: string): Observable<MovieList[]> {
    return this.http.get<MovieList[]>(AppConfig.searchMovies + serachQuery);
  }
  getTop(): Observable<MovieList[]> {
    return this.http.get<MovieList[]>(AppConfig.moviesTop);
  }
  addRate(movieId: number, value: number) {
    return this.http.post(AppConfig.rateMovie, { movieId: movieId, value: value });
  }
  like(reviewId: number, liked: boolean) {
    return this.http.post(AppConfig.addLike, { reviewId: reviewId, liked: liked });
  }
  addReview(movieId: number, text: string) {
    return this.http.post(AppConfig.addReview, { movieId: movieId, text: text })
  }
  addToWatchlist(movieId: number) {
    return this.http.post(AppConfig.addToWatchlist, movieId);
  }
  removeFromWatchlist(movieId: number) {
    return this.http.post(AppConfig.removeFromWatcchlist, movieId);
  }
}
