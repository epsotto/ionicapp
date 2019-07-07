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

  getFollowupList(userId:string, sessionKey:string){
    const dateToday = moment().format("YYYY-MM-DD");
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");
    const query = "SELECT * FROM Events WHERE eventstatus != 'Held' " + 
    "AND eventstatus != 'Not Held' AND date_start < '"+ dateToday +"' AND date_start > '" + startDueDate + "' AND assigned_user_id = '19x" + userId +"' ORDER BY date_start LIMIT 20;";
    // "AND eventstatus != 'Not Held' AND date_start < '"+ dateToday +"' AND date_start > '" + startDueDate + "' ORDER BY date_start LIMIT 20;"; //AND assigned_user_id = '19x" + userId +"' LIMIT 20;";
    const sessionName = sessionKey;

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getFollowupTotalRecords(userId:string, sessionKey:string){
    const dateToday = moment().format("YYYY-MM-DD");
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");
    const query = "SELECT COUNT(*) FROM Events WHERE eventstatus != 'Held' " + 
    "AND eventstatus != 'Not Held' AND date_start < '"+ dateToday +"' AND date_start > '" + startDueDate + "' AND assigned_user_id = '19x" + userId +"' ORDER BY date_start;";
    // "AND eventstatus != 'Not Held' AND date_start < '"+ dateToday +"' AND date_start > '" + startDueDate + "' ORDER BY date_start;"; //AND assigned_user_id = '19x" + userId +"' LIMIT 20;";
    const sessionName = sessionKey;

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getMoreFollowupRecords(userId:string, sessionKey:string, offset:number){
    const dateToday = moment().format("YYYY-MM-DD");
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");
    const query = "SELECT * FROM Events WHERE eventstatus != 'Held' " + 
    "AND eventstatus != 'Not Held' AND date_start < '"+ dateToday +"' AND date_start > '" + startDueDate + "' AND assigned_user_id = '19x" + userId +"' ORDER BY date_start LIMIT 20;";
    // "AND eventstatus != 'Not Held' AND date_start < '"+ dateToday +"' AND date_start > '" + startDueDate + "' ORDER BY date_start LIMIT " + offset + ",20;"; //AND assigned_user_id = '19x" + userId +"' LIMIT 20;";
    const sessionName = sessionKey;

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getCallList(userId:string, sessionKey:string) {
    const dateToday = moment().format("YYYY-MM-DD");
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");

    const query = "SELECT * FROM Events WHERE cf_985 != 'Call : Quote Follow Up' " + 
    "AND eventstatus != 'Not Held' AND date_start > '"+ dateToday +"' AND assigned_user_id = '19x" + userId +"' ORDER BY date_start LIMIT 20;";
    // "AND eventstatus != 'Not Held' AND date_start >= '"+ dateToday +"' ORDER BY date_start LIMIT 20;"; //AND assigned_user_id = '19x" + userId +"' LIMIT 20;";
    const sessionName = sessionKey;
    
    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getCallFollowupList(userId:string, sessionKey:string) {
    const dateToday = moment().format("YYYY-MM-DD");
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");

    const query = "SELECT * FROM Events WHERE cf_985 = 'Call : Quote Follow Up' " + 
    "AND eventstatus != 'Not Held' AND date_start >= '"+ dateToday +"' AND assigned_user_id = '19x" + userId +"' ORDER BY date_start LIMIT 20;";
    // "AND eventstatus != 'Not Held' AND date_start >= '"+ dateToday +"' ORDER BY date_start LIMIT 20;"; //AND assigned_user_id = '19x" + userId +"' LIMIT 20;";
    const sessionName = sessionKey;
    
    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getClientDetails(contactId:string, sessionName:string){
    const query = "SELECT * FROM Contacts WHERE id = '" + contactId + "' LIMIT 1;"

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }
}
