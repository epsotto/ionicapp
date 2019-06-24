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
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");
    const query = "SELECT * FROM Events WHERE eventstatus != 'Held' " + 
    "AND eventstatus != 'Not Held' AND due_date < '"+ dateToday +"' AND due_date > '" + startDueDate + "' AND assigned_user_id = '19x" + userId +"' LIMIT 20;";
    // "AND eventstatus != 'Not Held' AND due_date < '"+ dateToday +"' AND due_date > '" + startDueDate + "' LIMIT 20;"; //AND assigned_user_id = '19x" + userId +"' LIMIT 20;";
    const sessionName = sessionkey;

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }
}
