import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie';
import { Observable } from 'rxjs';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  data$: Observable<Movie>;
  constructor(
    private route: ActivatedRoute,
    private service: MoviesService
  ) { }

  ngOnInit() {
    this.data$ =
      this.service.getById(this.route.snapshot.paramMap.get('id'));
  }
}
