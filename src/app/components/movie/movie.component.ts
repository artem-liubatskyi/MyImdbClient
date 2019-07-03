import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: Movie;
  constructor(
    private route: ActivatedRoute,
    private service: MoviesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.service.getById(params.get('id')).subscribe(data=>this.movie=data);
    });
  }
  trailerUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailerUrl);
  }
}
