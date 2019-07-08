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
    const query = "SELECT * FROM Events WHERE eventstatus = 'Planned' " + 
    "AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' AND assigned_user_id = '" + userId +"' ORDER BY date_start LIMIT 20;";
    // "AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' ORDER BY date_start LIMIT 20;";
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
    const query = "SELECT COUNT(*) FROM Events WHERE eventstatus = 'Planned' " + 
    "AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' AND assigned_user_id = '" + userId +"' ORDER BY date_start;";
    // "AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' ORDER BY date_start;"; //AND assigned_user_id = '" + userId +"';";
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
    const query = "SELECT * FROM Events WHERE eventstatus = 'Planned' " + 
    "AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' AND assigned_user_id = '" + userId +"' ORDER BY date_start LIMIT 20;";
    // "AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' ORDER BY date_start LIMIT " + offset + ",20;";
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
    const query = "SELECT * FROM Events WHERE cf_985 != 'Call : Quote Follow Up' AND activitytype = 'Call'" + 
    "AND eventstatus = 'Planned' AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' AND assigned_user_id = '" + userId +"' ORDER BY date_start LIMIT 20;";
    // "AND eventstatus = 'Planned' AND date_start >= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' ORDER BY date_start LIMIT 20;"; 
    const sessionName = sessionKey;
    
    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getTotalCallRecords(userId:string, sessionKey:string){
    const dateToday = moment().format("YYYY-MM-DD");
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");
    const query = "SELECT COUNT(*) FROM Events WHERE cf_985 != 'Call : Quote Follow Up' AND activitytype = 'Call'" + 
    "AND eventstatus = 'Planned' AND date_start > '"+ dateToday +"' AND date_start >= '" + startDueDate + "' AND assigned_user_id = '" + userId +"' ORDER BY date_start;";
    // "AND eventstatus = 'Planned' AND date_start >= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' ORDER BY date_start;";
    const sessionName = sessionKey;
    
    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getMoreCallRecords(userId:string, sessionKey:string, offset:number){
    const dateToday = moment().format("YYYY-MM-DD");
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");
    const query = "SELECT * FROM Events WHERE cf_985 != 'Call : Quote Follow Up' AND activitytype = 'Call'" + 
    "AND eventstatus = 'Planned' AND date_start > '"+ dateToday +"' AND date_start >= '" + startDueDate + "' AND assigned_user_id = '" + userId +"' ORDER BY date_start LIMIT " + offset + ",20;";
    // "AND eventstatus = 'Planned' AND date_start >= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' ORDER BY date_start LIMIT " + offset + ",20;";
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
    const query = "SELECT * FROM Events WHERE cf_985 = 'Call : Quote Follow Up' AND activitytype = 'Call'" + 
    "AND eventstatus = 'Planned' AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' AND assigned_user_id = '" + userId +"' ORDER BY date_start LIMIT 20;";
    // "AND eventstatus = 'Planned' AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' ORDER BY date_start LIMIT 20;";
    const sessionName = sessionKey;
    
    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getTotalCallFollowupRecords(userId:string, sessionKey:string) {
    const dateToday = moment().format("YYYY-MM-DD");
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");
    const query = "SELECT COUNT(*) FROM Events WHERE cf_985 = 'Call : Quote Follow Up' AND activitytype = 'Call'" + 
    "AND eventstatus = 'Planned' AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' AND assigned_user_id = '" + userId +"' ORDER BY date_start;";
    // "AND eventstatus = 'Planned' AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' ORDER BY date_start;";
    const sessionName = sessionKey;
    
    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getMoreCallFollowupRecords(userId:string, sessionKey:string, offset:number) {
    const dateToday = moment().format("YYYY-MM-DD");
    const startDueDate = moment().subtract(120, 'days').format("YYYY-MM-DD");
    const query = "SELECT * FROM Events WHERE cf_985 = 'Call : Quote Follow Up' AND activitytype = 'Call'" + 
    "AND eventstatus = 'Planned' AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' AND assigned_user_id = '" + userId +"' ORDER BY date_start LIMIT " + offset + ",20;";
    // "AND eventstatus = 'Planned' AND date_start <= '"+ dateToday +"' AND date_start >= '" + startDueDate + "' ORDER BY date_start LIMIT " + offset + ",20;";
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
