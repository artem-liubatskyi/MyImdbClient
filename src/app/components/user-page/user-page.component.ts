import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPage } from 'src/app/models/user-page';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  data$: Observable<UserPage>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.data$ = this.userService.getUserPage();
  }

}
