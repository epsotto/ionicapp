import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, NavController, ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { CallNumber } from "@ionic-native/call-number/ngx";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { CallCommentsPage } from '../call-comments/call-comments.page';
import { MultipleNumbersPage } from '../multiple-numbers/multiple-numbers.page';
import { FollowupService } from 'src/app/services/followup.service';
import * as moment from "moment";

@Component({
  selector: 'app-overdues',
  templateUrl: './overdues.page.html',
  styleUrls: ['./overdues.page.scss'],
})
export class OverduesPage implements OnInit {
  public followupList = [];
  private msg: string = "";
  private selectedOppId:string = "";
  private retry:number = 3;
  private calledNumber:string = "";
  private dateCalled:number = 0;
  private totalRecordCount:number = 0;
  private selectedActivityId:string = "";
  private lastName:string = "";
  private eventNameSelected:string = "";
  isLoading:boolean = true;

  @ViewChild(IonRouterOutlet) routerOutlet : IonRouterOutlet;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(private menuController: MenuController,
              private callNumber: CallNumber,
              private toastController: ToastController,
              private statusBar: StatusBar,
              private nav: NavController,
              private dataStorage: DataStorageService,
              private modalController: ModalController,
              private alertController: AlertController,
              private followupService: FollowupService) { }

  ngOnInit() {
    this.menuController.enable(true);
    this.statusBar.overlaysWebView(false);
    this.pullFollowupList();
    this.getFollowupListTotalCount();
  }

  getFollowupListTotalCount() {
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.followupService.getFollowupTotalRecords(res.userId, res.sessionName).then((res) => {
          const data = JSON.parse(res.data);
          if(data.success){
            this.totalRecordCount = parseInt(data.result[0].count);
          }
        });
      }
    });
  }

  pullFollowupList() {
    this.isLoading = true;
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.followupService.getFollowupList(res.userId, res.sessionName).then((res) => {
          let data = JSON.parse(res.data);
          if(!data.success){
            if(data.error.code === "INVALID_SESSIONID" && this.retry > 0){
              this.pullFollowupList();
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
                EventName: data.result[i].cf_985,
                StartDate: moment(data.result[i].date_start).format("DD MMM, YYYY") + " " + data.result[i].time_start.substring(0, 5),
              }
    
              this.followupList = this.followupList.concat(singleRecord);
            }
          }

          this.isLoading = false;
        });
      }
    });
  }

  DialNumber(contactId:string, oppId:string, activityId:string, eventName:string){
    if(contactId){
      this.dataStorage.retrieveCachedData().then((res) => {
        if(res != null){
          this.followupService.getClientDetails(contactId, res.sessionName).then((res) => {
            let phone = [];
            const data = JSON.parse(res.data);
            if(data.success){
              this.lastName = data.result[0].lastname;
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: CallCommentsPage,
      componentProps: {
        "oppId": this.selectedOppId,
        "activityId": this.selectedActivityId,
        "calledNumber": this.calledNumber,
        "dateCalled": this.dateCalled,
        "isDirectlyMarkedComplete": false,
        "lastName": this.lastName,
        "eventName": this.eventNameSelected
      }
    });

    modal.onDidDismiss().then(res => {
      if(res.data.isSuccess){
        this.calledNumber = "";
        this.dateCalled = 0;
      }
      else {
        this.presentAlert("Something went wrong.", "Please contact Support if this issue persists.");
      }
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

  doRefresh(event) {
    this.followupList = [];
    this.pullFollowupList();
    event.target.disabled = true;
    event.target.complete();
    setTimeout(() => {
      event.target.disabled = false;
    }, 100);
  }

  loadData(event) {
    if(this.followupList.length < this.totalRecordCount){
      this.dataStorage.retrieveCachedData().then((res) => {
        if(res != null){
          this.followupService.getMoreFollowupRecords(res.userId, res.sessionName, this.followupList.length + 1).then((res) => {
            const data = JSON.parse(res.data);
            
            for(var i = 0; i < data.result.length; i++){
              let singleRecord = {
                OppId: data.result[i].parent_id,
                OppName: data.result[i].subject,
                ContactId: data.result[i].contact_id,
                ActivityType: data.result[i].activitytype,
                StartDate: moment(data.result[i].date_start).format("DD MMM, YYYY") + " " + data.result[i].time_start.substring(0, 5),
                ActivityId: data.result[i].id,
                EventName: data.result[i].cf_985
              }
    
              this.followupList = this.followupList.concat(singleRecord);
            }
            
            event.target.complete();
          });
        }
      });
    } else {
      event.target.disabled = true;
    }
  }

  async presentAlert(header:string, msg:string){
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ["OK"]
    });

    alert.present();
  }
}
