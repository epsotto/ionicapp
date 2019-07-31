import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  serviceUrl:string = "http://crm.frescoshades.co.nz/webservice.php";

  constructor(private http: HTTP) {}

  getDataForChart(sessionName:string, startDate:string, endDate:string, chartType:string){    
    var queryParams = {
      "operation": "getChartData",
      "sessionName": sessionName,
      "start_date": startDate,
      "end_date": endDate,
      "chart_type": chartType
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }
}
