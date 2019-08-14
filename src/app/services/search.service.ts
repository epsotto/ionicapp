import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  serviceUrl:string = "http://crm.frescoshades.co.nz/webservice.php";

  constructor(private http:HTTP) { }

  getOpportunityList(sessionName:string, opportunityName:string, opportunityNumber:string, assignedTo:string){
    let queryFilter = [];

    if(opportunityName !== "") {
      queryFilter = queryFilter.concat("potentialname LIKE '%" + opportunityName + "%'");
    }
    if(opportunityNumber !== "") {
      queryFilter = queryFilter.concat("potential_no LIKE '%" + opportunityNumber + "%'");
    }
    if(assignedTo !== "") {
      queryFilter = queryFilter.concat("assigned_user_id ='" + assignedTo + "'");
    }

    const filterString = queryFilter.join(" AND ");
    
    const query = "SELECT * FROM Potentials WHERE " + filterString + " LIMIT 20;";

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getAllUsers(sessionName:string){
    const query = "SELECT user_name, id FROM Users WHERE status = 'Active' AND isactivesalesman = '1';";

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getTotalSearchResultItems(sessionName:string, opportunityName:string, opportunityNumber:string, assignedTo:string) {
    let queryFilter = [];

    if(opportunityName !== "") {
      queryFilter = queryFilter.concat("potentialname LIKE '%" + opportunityName + "%'");
    }
    if(opportunityNumber !== "") {
      queryFilter = queryFilter.concat("potential_no LIKE '%" + opportunityNumber + "'");
    }
    if(assignedTo !== "") {
      queryFilter = queryFilter.concat("assigned_user_id ='" + assignedTo + "'");
    }

    const filterString = queryFilter.join(" AND ");
    
    const query = "SELECT COUNT(*) FROM Potentials WHERE " + filterString + ";";

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }

  getMoreSearchResults(offset:number, sessionName:string, opportunityName:string, opportunityNumber:string, assignedTo:string) {
    let queryFilter = [];

    if(opportunityName !== "") {
      queryFilter = queryFilter.concat("potentialname LIKE '%" + opportunityName + "%'");
    }
    if(opportunityNumber !== "") {
      queryFilter = queryFilter.concat("potential_no LIKE '%" + opportunityNumber + "'");
    }
    if(assignedTo !== "") {
      queryFilter = queryFilter.concat("assigned_user_id ='" + assignedTo + "'");
    }

    const filterString = queryFilter.join(" AND ");
    
    const query = "SELECT * FROM Potentials WHERE " + filterString + " LIMIT "+ offset +",20;";

    var queryParams = {
      "operation": "query",
      "sessionName": sessionName,
      "query": query
    };

    return this.http.get(this.serviceUrl, queryParams, {"Content-Type": "application/json"});
  }
}
