import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  serviceUrl:string = "http://crm.frescoshades.co.nz/webservice.php";

  constructor(private http: HTTP) {}

  getDataForChart(sessionName:string, startDate:string, endDate:string){
    const envVars = {
      "start_date": startDate,
      "end_date": endDate
    }
    
    var queryParams = {
      "operation": "getChartData",
      "sessionName": sessionName,
      "envVars": JSON.stringify(envVars)
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }
}
