import { Injectable } from '@angular/core';
import { MoviePerson } from '../models/movie-person';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/config';

@Injectable()
export class MoviePersonsService {

  constructor(private http: HttpClient) {}
  
  getById(id: number | string): Observable<MoviePerson> {
    return this.http.get<MoviePerson>(AppConfig.personById + id);
  }
}
