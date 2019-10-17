import { Component, OnInit, Input } from '@angular/core';
import { Review } from 'src/app/models/review';
import { MoviesService } from 'src/app/services/movies.service';
import { first } from 'rxjs/operators';
import { ReviewThumbs } from 'src/app/models/review-thumbs';
import { AuthenticationService } from 'src/app/services/authentication-service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review

  constructor(private authSevice: AuthenticationService, private service: MoviesService) { }

  ngOnInit() {
  }
  likeClick(liked: boolean) {
    if (this.authSevice.isAuthenticated())
      this.service.like(this.review.id, liked).pipe(first())
        .subscribe((data: ReviewThumbs) => {
          if (data == null)
            return;
          this.review.likesCount = data.likesCount;
          this.review.dislikesCount = data.dislikesCount;
          
          if (this.review.likedByCurrentUser == liked)
            this.review.likedByCurrentUser = null
          else
            this.review.likedByCurrentUser = liked;
        },
          error => {

          });
  }
}
