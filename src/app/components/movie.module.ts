import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { MovieTopComponent } from './movie-top/movie-top.component';
import { MoviesService } from '../services/movies.service';
import { MovieRoutingModule } from '../routing/movie/movie-routing.module';
import { MoviePersonComponent } from './movie-person/movie-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RateComponent } from './rate/rate.component';
import { MoviePersonsService } from '../services/movie-persons.service';
import { AddToWatchlistComponent } from './add-to-watchlist/add-to-watchlist.component';
import { ReviewComponent } from './review/review.component';
import { AddReviewComponent } from './add-review/add-review.component';

@NgModule({
  declarations: [
    MovieComponent, 
    MovieTopComponent, 
    MoviePersonComponent,
    RateComponent,
    AddToWatchlistComponent,
    ReviewComponent,
    AddReviewComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    RateComponent,
    AddToWatchlistComponent
  ],
  providers: [MoviesService, MoviePersonsService],
})
export class MovieModule { }
