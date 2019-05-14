import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from "@ionic/storage";
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5'
// import { HTTP } from "@ionic-native/http/ngx";

const TOKEN_KEY = 'auth-token';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // headers = new Headers({"content-type": "application/x-www-form-urlencoded"});
  // options = new RequestOptions({headers: this.headers});

  authenticationState = new BehaviorSubject(false);
  serviceUrl:string = "http://crm.frescoshades.co.nz/webservice.php";

  constructor(private storage: Storage, private plt: Platform, private http: HttpClient) { //HTTP){
    this.plt.ready().then(() => {
      this.checkToken();
    })
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if(res){
        this.authenticationState.next(true);
      }
    })
  }

  login() {
    return this.storage.set(TOKEN_KEY, 'Fresco1234').then(res => {
      this.authenticationState.next(true);
    });
  }

  getChallengeToken(username:string):Observable<any>{//:Observable<any>
    const serveUrl = this.serviceUrl + "?operation=getchallenge&username=" + username;
    return this.http.get(serveUrl); //, {}, {}
  }

  // userLogin(auth:any):Observable<any>{
  //   debugger;
  //   const serveUrl = this.serviceUrl;
  //   var md5 = new Md5();
  //   let accessKey = md5.appendStr(auth.token).appendStr(auth.accessKey).end();
  //   let second = Md5.hashStr(auth.token + auth.key);

  //   const query = {
  //     operation: "login",
  //     username: auth.username,
  //     accessKey: accessKey
  //   };

  //   return this.http.post<any>(serveUrl, query, httpOptions);
  // }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    })
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
