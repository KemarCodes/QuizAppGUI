import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:5000';

  constructor(private router: Router,
     private httpClient: HttpClient) { }

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


  login(form){
    this.httpClient.post(
      `${this.AUTH_SERVER_ADDRESS}/user/login`, form.value, this.httpOptions)
      .subscribe(data => {
        this.router.navigate(['studysets/'.concat(data['access_token'])]);
      }, error => {
        console.log(error);
      });

  }

  ngOnInit() {
  }

}
