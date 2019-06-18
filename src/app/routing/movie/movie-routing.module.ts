import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from 'src/app/components/movie/movie.component';
import { MovieTopComponent } from 'src/app/components/movie-top/movie-top.component';
import { MoviePersonComponent } from 'src/app/components/movie-person/movie-person.component';

const movieRoutes: Routes = [
  {
    path: 'movie/:id', 
    component: MovieComponent
  },
  {
    path: 'top',
    component: MovieTopComponent
  },
  {
    path: 'person/:id',
    component: MoviePersonComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(movieRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MovieRoutingModule { }
