import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from "@ionic/storage";
import { Platform } from '@ionic/angular';
import { HTTP } from "@ionic-native/http/ngx";
import {Md5} from "ts-md5";
import { DataStorageService } from './data-storage.service';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  serviceUrl:string = "https://crm.frescoshades.co.nz/webservice.php";

  constructor(private storage: Storage, private plt: Platform, 
    private http : HTTP, private globalStorage: DataStorageService) { 
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

  loginSet(sessionName:string, userId:string, accessKey:string) {
    const auth = {
      userId: userId,
      accessKey: accessKey,
      sessionName: sessionName
    }
    return this.storage.set(TOKEN_KEY, auth).then(res => {
      this.authenticationState.next(true);
    });
  }

  getChallengeToken(username:string){//:Observable<any>
    const serveUrl = this.serviceUrl + "?operation=getchallenge&username=" + username;
    return this.http.get(serveUrl, {}, {});
  }

  userLogin(auth:any){
    const serveUrl = this.serviceUrl;
    let generatedKey = Md5.hashStr(auth.token + auth.accessKey);

    const query = {
      "operation": "login",
      "username": auth.username,
      "accessKey": generatedKey
    };

    return this.http.post(serveUrl, query, {
      'Content-Type': 'application/json'
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    })
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
