import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS: string = 'http://localhost:5000';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, public storage: Storage) { }

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  register(user: User): Observable<AuthResponse> {
    console.log(user.email)
    return this.httpClient.post(
      `${this.AUTH_SERVER_ADDRESS}/user/register`, user, this.httpOptions).pipe(
      tap(async (res: AuthResponse ) => {
      if(res.user){
        await this.storage.set("ACCESS_TOKEN", res.user.access_token);
        await this.storage.set("EXPIRES_IN", res.user.expires_in);
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
        await this.storage.set("ACCESS_TOKEN", res.user.access_token);
        await this.storage.set("EXPIRES_IN", res.user.expires_in);
        this.authSubject.next(true);
      }
    })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

}
