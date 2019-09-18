import { Injectable, wtfEndTimeRange } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ViewActivityDetailService {
  serviceUrl:string = "http://crm.frescoshades.co.nz/webservice.php";

  constructor(private http: HTTP) { }

  getClientDetailData(sessionName:string, contactId:string){
    const query = "SELECT * FROM Contacts WHERE id = '" + contactId + "' LIMIT 1;";

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, { "Content-Type": "application/json" });
  }

  getOppDetailData(sessionName:string, oppId:string){
    const query = "SELECT * FROM Potentials WHERE id='" + oppId + "' LIMIT 1;";

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, { "Content-Type": "application/json" });
  }

  markActivityComplete (sessionName:string, oppId:string, wfId:string, activityId:string) {
    const envVars = {
      activityId: activityId
    };

    const queryParams = {
      "operation": "executeWF",
      "sessionName": sessionName,
      "wfId": wfId,
      "crmId": oppId,
      "envVars": JSON.stringify(envVars)
    }

    return this.http.get(this.serviceUrl, queryParams, { "Content-Type": "application/json" });
  }

  submitComments (sessionName:string, oppId:string, wfId:string, comments:string, userLocation:string) {
    const envVars = {
      "comments": comments,
      "gps_location": userLocation
    }

    const queryParams = {
      "operation": "executeWF",
      "sessionName": sessionName,
      "wfId": wfId,
      "crmId": oppId,
      "envVars": JSON.stringify(envVars)
    }

    return this.http.get(this.serviceUrl, queryParams, { "Content-Type": "application/json" });
  }

   submitOppComments (sessionName:string, oppId:string, wfId:string, comments:string) {
    const envVars = {
      "comment": comments
    }

    const queryParams = {
      "operation": "executeWF",
      "sessionName": sessionName,
      "wfId": wfId,
      "crmId": oppId,
      "envVars": JSON.stringify(envVars)
    }

    return this.http.get(this.serviceUrl, queryParams, { "Content-Type": "application/json" });
  }

  createNewActivity (sessionName: string, oppId:string, wfId:string, activityType:string, activityAction:string, startDate:string, startTime:string, duration:string, activityStatus: string) {
    const envVars = {
      "event_subject": "Auto Generated",
      "activity_type": activityType, // "Mobile Call"
      "activity_action": activityAction, //"Mobile Call : Call Logging"
      "start_date": startDate,
      "start_time": startTime,
      "duration": duration,
      "activity_status": activityStatus,
      "create_new_quote": 0
    }

    const queryParams = {
      "operation": "executeWF",
      "sessionName": sessionName,
      "wfId": wfId,
      "crmId": oppId,
      "envVars": JSON.stringify(envVars)
    }

    return this.http.get(this.serviceUrl, queryParams, { "Content-Type": "application/json" });
  }

  createCustomActivity (sessionName: string, oppId:string, wfId:string, activityType:string, activityAction:string, startDate:string, startTime:string, duration:string, activityStatus: string, subjectHeader:string, isNewTask:number) {
    const envVars = {
      "event_subject": subjectHeader,
      "activity_type": activityType, // "Mobile Call"
      "activity_action": activityAction, //"Mobile Call : Call Logging"
      "start_date": startDate,
      "start_time": startTime,
      "duration": duration,
      "activity_status": activityStatus,
      "create_new_quote": isNewTask
    }

    const queryParams = {
      "operation": "executeWF",
      "sessionName": sessionName,
      "wfId": wfId,
      "crmId": oppId,
      "envVars": JSON.stringify(envVars)
    }

    return this.http.get(this.serviceUrl, queryParams, { "Content-Type": "application/json" });
  }

  getOpportunityLatestComments(id:string, sessionName:string) {
    const queryParams = {
      "operation": "retrieve_related",
      "id": id,
      "sessionName": sessionName,
      "relatedLabel": "ModComments",
      "relatedType": "ModComments"
    }  

    return this.http.get(this.serviceUrl, queryParams, { "Content-Type": "application/json" });
  }

  createNewSupportRecord(sessionName:string, userId:string, oppId:string, supportPerson:string, supportType:string, comment:string) {
    const envVars = {value: {
        "support_person": supportPerson,
        "support_type": supportType,
        "support_comment": comment,
        "requested_by_id": userId
      }
    };

    const queryParams = {
      "operation": "executeWF",
      "sessionName": sessionName,
      "wfId" : "139",
      "crmId": oppId,
      "envVars": JSON.stringify(envVars)
    };

    return this.http.get(this.serviceUrl, queryParams, { "Content-Type": "application/json" });
  }
}
