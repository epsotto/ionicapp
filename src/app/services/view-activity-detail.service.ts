import { Injectable } from '@angular/core';
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
}
