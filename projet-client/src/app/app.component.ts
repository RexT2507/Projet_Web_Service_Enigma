import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projet-client';

  User: any = [];

  constructor(protected authService: AuthService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    return this.authService.getUser().subscribe(
      data => {
        console.log(data);
        this.User = data;
    },
    error => console.log(error));
  }
}
