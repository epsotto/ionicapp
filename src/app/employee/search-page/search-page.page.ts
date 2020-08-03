import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { SearchService } from 'src/app/services/search.service';
import { AlertController, NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {

  public searchResultList = [];
  public assignedToList = [];
  public opportunityNumber:string = "";
  public opportunityName:string = "";
  public clientName:string = "";
  public assignedTo:string = "";
  public isLoading = false;
  public clearOppNumber = false;
  public clearOppName = false;
  public clearClientName = false;

  private searchResultRecordCount = 0;

  constructor(private dataStorage: DataStorageService,
              private searchService: SearchService,
              private alert: AlertController,
              private nav: NavController) { }

  ngOnInit() {
    // Replacing the getting of users from vTiger for now due to an issue where several users were not able to access the data
    // this.dataStorage.retrieveCachedData().then((res) => {
    //   if(res != null){
    //     this.searchService.getAllUsers(res.sessionName).then((res) => {
    //       let data = JSON.parse(res.data);

    //       if(data.success){
    //         for(var i = 0; i < data.result.length; i++){
    //           let user = {
    //             text: data.result[i].user_name,
    //             value: data.result[i].id
    //           }

    //           this.assignedToList = this.assignedToList.concat(user);
    //         }
    //       }
    //     });
    //   }
    // });

    this.assignedToList = [
      {
        text: "richard.cummins",
        value: "19x17"
      },
      {
        text: "oliver.cummins",
        value: "19x37"
      },
      {
        text: "scott.minhinnick",
        value: "19x58"
      },
      {
        text: "richie.staunton",
        value: "19x104"
      },
      {
        text: "richard.lyne",
        value: "19x105"
      },
      {
        text: "mathew.barker",
        value: "19x107"
      },
    ];
      
  }

  onSearchClick() {
    if(this.opportunityName === "" && this.opportunityNumber === "" && this.assignedTo === "" && this.clientName === ""){
      this.presentAlert("All search fields are empty. Please enter an entry for at least one search field.");
      return false;
    }

    this.dataStorage.retrieveCachedData().then((res) => {
      this.isLoading = true;
      if(res != null) {
        this.searchService.getOpportunityList(res.sessionName, this.opportunityName, this.opportunityNumber, this.assignedTo, this.clientName)
          .then((res) => {
            let data = JSON.parse(res.data);

            if(data.success) {
              this.searchResultList = [];
              for(var i = 0; i < data.result.length; i++){
                let singleRecord = {
                  OppId: data.result[i].id,
                  OppName: data.result[i].potentialname,
                  OppPotentialId: data.result[i].potential_no,
                  ContactId: data.result[i].contact_id,
                  OppStatus: data.result[i].sales_stage,
                  lastUpdatedDate: moment(data.result[i].modifiedtime).format("MMM DD, YYYY HH:mm")
                };

                this.searchResultList = this.searchResultList.concat(singleRecord);
              }

              this.isLoading = false;
            }
          });

        this.searchService.getTotalSearchResultItems(res.sessionName, this.opportunityName, this.opportunityNumber, this.assignedTo, this.clientName)
          .then((res) => {
            let data = JSON.parse(res.data);

            if(data.success){
              this.searchResultRecordCount = parseInt(data.result[0].count);
            }
          });
      }
    });
  }

  loadData(event){
    if(this.searchResultList.length < this.searchResultRecordCount){
      this.dataStorage.retrieveCachedData().then((res) => {
        if(res != null) {
          this.searchService.getMoreSearchResults(this.searchResultList.length, res.sessionName, this.opportunityName, this.opportunityNumber, this.assignedTo)
            .then((res) => {
              let data = JSON.parse(res.data);
              if(data.success) {
                for(var i = 0; i < data.result.length; i++){
                  let singleRecord = {
                    OppId: data.result[i].id,
                    OppName: data.result[i].potentialname,
                    OppPotentialId: data.result[i].potential_no,
                    ContactId: data.result[i].contact_id,
                    OppStatus: data.result[i].sales_stage,
                    lastUpdatedDate: moment(data.result[i].modifiedtime).format("MMM DD, YYYY HH:mm")
                  };
  
                  this.searchResultList = this.searchResultList.concat(singleRecord);
                }
              }
            });
        }
      })
    }
    event.target.complete();
  }

  async presentAlert(msg:string){
    const alertBox = await this.alert
                    .create({header: "Error",
                      message: msg,
                      buttons: ["OK"]});

    alertBox.present();
  }

  opportunitySelected(event, oppId:string, contactId:string, potentialNumber:string){
    event.preventDefault();

    const dataIds = {
      OppId: oppId,
      ContactId: contactId,
      OriginURL: "search-page",
      ActivityName: potentialNumber
    }

    this.dataStorage.setData("dataIds", dataIds);
    this.nav.navigateRoot(`/employee/view-activity-detail/${oppId}`);
  }
}
