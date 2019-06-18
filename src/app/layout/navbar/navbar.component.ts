import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }
  logOutClick(){
      this.authService.logout();
      location.reload();
    }
}
