import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { AuthenticationService } from 'src/app/services/authentication-service';

@Component({
  selector: 'app-add-to-watchlist',
  templateUrl: './add-to-watchlist.component.html',
  styleUrls: ['./add-to-watchlist.component.css']
})
export class AddToWatchlistComponent implements OnInit {

  @Input() exist: boolean;
  @Input() movieId: number;

  constructor(private service: MoviesService, private authService: AuthenticationService) { }

  ngOnInit() {

  }
  onClick() {
    if (this.exist == true)
      this.service.removeFromWatchlist(this.movieId).subscribe();
    else
      this.service.addToWatchlist(this.movieId).subscribe();
    this.exist = !this.exist;
  }
}
