import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, ModalController, NavController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FollowupService } from 'src/app/services/followup.service';
import * as moment from "moment";
import { MultipleNumbersPage } from '../../multiple-numbers/multiple-numbers.page';
import { CallCommentsPage } from '../../call-comments/call-comments.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-calls-planned',
  templateUrl: './calls-planned.page.html',
  styleUrls: ['./calls-planned.page.scss'],
})
export class CallsPlannedPage implements OnInit {

  private msg:string;
  private calledNumber:string;
  private selectedOppId:string;
  private dateCalled:number;
  private retry = 3;
  private totalRecordCount:number = 0;
  private lastName:string = "";
  private eventNameSelected:string = "";
  callPlannedList = [];
  isLoading:boolean;
  private selectedActivityId:string = "";

  constructor(private menuController: MenuController,
              private callNumber: CallNumber,
              private toastController: ToastController,
              private statusBar: StatusBar,
              private nav: NavController,
              private dataStorage: DataStorageService,
              private modalController: ModalController,
              private followupService: FollowupService) { }

  ngOnInit() {
    this.menuController.enable(true);
    this.statusBar.overlaysWebView(false);
    this.pullCallPlannedList();
    this.getTotalCallPlannedCount();
  }

  getTotalCallPlannedCount() {
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.followupService.getTotalCallPlannedRecords(res.userId, res.sessionName).then((res) => {
          const data = JSON.parse(res.data);
          if(data.success){
            this.totalRecordCount = parseInt(data.result[0].count);
          }
        });
      }
    });
  }

  pullCallPlannedList() {
    this.isLoading = true;
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.followupService.getCallPlannedList(res.userId, res.sessionName).then((res) => {
          let data = JSON.parse(res.data);
          if(!data.success){
            if(data.error.code === "INVALID_SESSIONID" && this.retry > 0){
              this.pullCallPlannedList();
            }
            else if(this.retry == 0){
              this.retry = 3;
              this.msg = "Error fetching data. Please refresh page.";
              this.presentToast();
            }
          } else {
            this.retry = 3;
            
            for(var i = 0; i < data.result.length; i++){
              let singleRecord = {
                OppId: data.result[i].parent_id,
                OppName: data.result[i].subject,
                ContactId: data.result[i].contact_id,
                ActivityId: data.result[i].id,
                ActivityType: data.result[i].activitytype,
                StartDate: moment(data.result[i].date_start).format("DD MMM, YYYY") + " " + data.result[i].time_start.substring(0, 5),
                EventName: data.result[i].cf_985
              }
    
              this.callPlannedList = this.callPlannedList.concat(singleRecord);
            }
          }

          this.isLoading = false;
        })
      }
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CallCommentsPage,
      componentProps: {
        "oppId": this.selectedOppId,
        "activityId": this.selectedActivityId,
        "calledNumber": this.calledNumber,
        "dateCalled": this.dateCalled,
        "isDirectlyMarkedComplete": false
      }
    });

    modal.onDidDismiss().then(res => {
      this.calledNumber = "";
      this.dateCalled = 0;
      console.log(res);
    });
    modal.present();
  }

  async presentMultipleNumbersModal(contactNumbers){
    const modal = await this.modalController.create({
      component: MultipleNumbersPage,
      componentProps: {
        "contactNumbers": contactNumbers
      }
    });

    modal.onDidDismiss().then(res => {
      if(res.data != "" && typeof(res.data) !== "undefined"){
        this.callNumber.callNumber(res.data, true)
        .then(res => {
          this.msg = "Called " + res.data;
          this.calledNumber = res.data;
          this.presentToast();
          this.presentModal();
        }).catch(err => {
          this.msg = "Error in dialer " + err;
          this.presentToast();
        });
      }
    });

    modal.present();
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message: this.msg,
      duration: 2000,
      color: "medium",
      closeButtonText: "hide"
    });

    toast.present();
  }
  
  doRefresh(event) {
    this.callPlannedList = [];
    this.pullCallPlannedList();
    event.target.disabled = true;
    event.target.complete();
    setTimeout(() => {
      event.target.disabled = false;
    }, 100);
  }

  loadData(event) {
    if(this.callPlannedList.length < this.totalRecordCount){
      this.dataStorage.retrieveCachedData().then((res) => {
        if(res != null){
          this.followupService.getMoreCallPlannedList(res.userId, res.sessionName, this.callPlannedList.length + 1).then((res) => {
            const data = JSON.parse(res.data);
            
            for(var i = 0; i < data.result.length; i++){
              let singleRecord = {
                OppId: data.result[i].parent_id,
                OppName: data.result[i].subject,
                ContactId: data.result[i].contact_id,
                ActivityId: data.result[i].id,
                ActivityType: data.result[i].activitytype,
                StartDate: moment(data.result[i].date_start).format("DD MMM, YYYY") + " " + data.result[i].time_start.substring(0, 5),
                EventName: data.result[i].cf_985
              }
    
              this.callPlannedList = this.callPlannedList.concat(singleRecord);
            }
            
            event.target.complete();
          });
        }
      });
    } else {
      event.target.disabled = true;
    }
  }

  contactSelected(event, OppId:string, ContactId:string, activityType:string, activityId:string, activityName:string, startDate:string, eventName:string){
    event.preventDefault();
    const dataIds = {
      OppId: OppId,
      ContactId: ContactId,
      ActivityType: activityType,
      ActivityId: activityId,
      ActivityName: activityName,
      OriginURL: "overdues",
      StartDate: startDate,
      EventName: eventName
    }
    this.dataStorage.setData("dataIds", dataIds);
    this.nav.navigateRoot(`/employee/view-activity-detail/${OppId}`);
  }

  DialNumber(contactId:string, oppId:string, activityId:string, eventName:string){
    if(contactId){
      this.dataStorage.retrieveCachedData().then((res) => {
        if(res != null){
          this.followupService.getClientDetails(contactId, res.sessionName).then((res) => {
            let phone = [];
            let data = JSON.parse(res.data);
            if(data.success){
              this.lastName = data.result[0].lastName
              if(data.result[0].homephone !== "") {
                phone = phone.concat(data.result[0].homephone);
              }
              if(data.result[0].mobile !== "") {
                phone = phone.concat(data.result[0].mobile);
              }
              if(data.result[0].otherphone !== "") {
                phone = phone.concat(data.result[0].otherphone);
              }
              if(data.result[0].phone !== "") {
                phone = phone.concat(data.result[0].phone);
              }

              if(phone.length > 1) {
                  this.presentMultipleNumbersModal(phone);
                }
                else {
                  this.callNumber.callNumber(phone[0], true)
                    .then(res => {
                      this.msg = "Called " + phone[0];
                      this.calledNumber = phone[0];
                      this.dateCalled = (new Date).getTime();
                      this.selectedOppId = oppId;
                      this.selectedActivityId = activityId;
                      this.eventNameSelected = eventName;
                      this.presentToast();
                      this.presentModal();
                    }).catch(err => {
                      this.msg = "Error in dialer " + err;
                      this.presentToast();
                    });
                }
            }
          });
        }
      });
    }
  }
}
