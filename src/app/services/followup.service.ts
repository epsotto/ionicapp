import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { DataStorageService } from "./data-storage.service";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class FollowupService {
  serviceUrl:string = "http://crm.frescoshades.co.nz/webservice.php";

  constructor(private http: HTTP,
      private dataStorage: DataStorageService) { }

  getFollowupList(userId:string ,sessionkey:string){
    const dateToday = moment().format("YYYY-MM-DD");
    const query = "SELECT * FROM Events WHERE cf_985 LIKE '%Follow Up' AND eventstatus != 'Held' " + 
    "AND eventstatus != 'Not Held' AND due_date < '"+ dateToday +"' AND assigned_user_id = '19x" + userId +"';";
    const sessionName = sessionkey;
    console.log("sessionName: " + sessionName);

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }
}
