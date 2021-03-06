import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { StorageService, Item } from '../storage.service';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:5000';
  authSubject = new BehaviorSubject(false);
  items: Item[] = [];
  newItem: Item = <Item>{};

  constructor(private httpClient: HttpClient, public storage: StorageService) { }

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  register(user: User): Observable<AuthResponse> {
    console.log(user.email)
    return this.httpClient.post(
      `${this.AUTH_SERVER_ADDRESS}/user/register`, user, this.httpOptions).pipe(
      tap(async (res: AuthResponse ) => {
      if(res.user){
        //this.newItem.key = "ACCESS_TOKEN";
        //this.newItem.value = res.user.access_token;
        //await this.storage.addItem(this.newItem);
        //await this.storage.set("EXPIRES_IN", res.user.expires_in);
        this.authSubject.next(true);
      }
    })
    );
  }

  login(user: User): Observable<AuthResponse> {
    console.log(user.email)
    return this.httpClient.post(
      `${this.AUTH_SERVER_ADDRESS}/user/login`, user, this.httpOptions).pipe(
      tap(async (res: AuthResponse ) => {
      if(res.user){
        //this.newItem.key = "ACCESS_TOKEN";
        //this.newItem.value = res.user.access_token;
        //await this.storage.addItem(this.newItem);
        //await this.storage.set("EXPIRES_IN", res.user.expires_in);
        console.log(res.user.access_token);
        this.authSubject.next(true);
      }
    })
    );
  }

  //async logout() {
    //await this.storage.remove("ACCESS_TOKEN");
    //await this.storage.remove("EXPIRES_IN");
    //this.authSubject.next(false);
  //}

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

}
