import { Component, OnInit } from '@angular/core';
import { MoviePerson } from 'src/app/models/movie-person';
import { MoviePersonsService } from 'src/app/services/movie-persons.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-person',
  templateUrl: './movie-person.component.html',
  styleUrls: ['./movie-person.component.css']
})
export class MoviePersonComponent implements OnInit {

  person$: Observable<MoviePerson>;

  constructor(
    private service: MoviePersonsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.person$ =
      this.service.getById(this.route.snapshot.paramMap.get('id'));
  }

}
