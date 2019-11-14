import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projet-client';

  User: any = [];
  userEmail: string;

  constructor(protected authService: AuthService, private actRoute: ActivatedRoute) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const splitToken = token.split('.');
    const tokenSlipted = splitToken[1];
    const tokenDecodeB64 = atob(tokenSlipted);
    console.log(`Token décodé en base64 : ${tokenDecodeB64}`);
    const parseToken = JSON.parse(tokenDecodeB64);
    console.log(parseToken);
    const tokenSub = parseToken.sub;
    const email = JSON.parse(tokenSub).email;
    console.log(email);
    this.userEmail = email;
  }


}
