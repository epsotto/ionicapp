import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, NavController, ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FollowupService } from 'src/app/services/followup.service';
import * as moment from "moment";

@Component({
  selector: 'app-meetings-planned',
  templateUrl: './meetings-planned.page.html',
  styleUrls: ['./meetings-planned.page.scss'],
})
export class MeetingsPlannedPage implements OnInit {

  private msg:string;
  private retry = 3;
  private totalRecordCount:number = 0;
  meetingPlannedList = [];
  isLoading:boolean;

  constructor(private menuController: MenuController,
              private toastController: ToastController,
              private statusBar: StatusBar,
              private nav: NavController,
              private dataStorage: DataStorageService,
              private followupService: FollowupService) { }

  ngOnInit() {
    this.menuController.enable(true);
    this.statusBar.overlaysWebView(false);
    this.pullMeetingPlannedList();
    this.getTotalMeetingPlannedCount();
  }

  getTotalMeetingPlannedCount() {
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.followupService.getTotalMeetingPlannedRecords(res.userId, res.sessionName).then((res) => {
          const data = JSON.parse(res.data);
          if(data.success){
            this.totalRecordCount = parseInt(data.result[0].count);
          }
        });
      }
    });
  }

  pullMeetingPlannedList() {
    this.isLoading = true;
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.followupService.getMeetingPlannedList(res.userId, res.sessionName).then((res) => {
          let data = JSON.parse(res.data);
          if(!data.success){
            if(data.error.code === "INVALID_SESSIONID" && this.retry > 0){
              this.pullMeetingPlannedList();
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
                ActivityType: data.result[i].activitytype,
                StartDate: moment(data.result[i].date_start).format("DD MMM, YYYY HH:mm")
              }
    
              this.meetingPlannedList = this.meetingPlannedList.concat(singleRecord);
            }
          }

          this.isLoading = false;
        })
      }
    });
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
    this.meetingPlannedList = [];
    this.pullMeetingPlannedList();
    event.target.disabled = true;
    event.target.complete();
    setTimeout(() => {
      event.target.disabled = false;
    }, 100);
  }

  loadData(event) {
    if(this.meetingPlannedList.length !== this.totalRecordCount){
      this.dataStorage.retrieveCachedData().then((res) => {
        if(res != null){
          this.followupService.getMoreMeetingPlannedList(res.userId, res.sessionName, this.meetingPlannedList.length + 1).then((res) => {
            const data = JSON.parse(res.data);
            
            for(var i = 0; i < data.result.length; i++){
              let singleRecord = {
                OppId: data.result[i].parent_id,
                OppName: data.result[i].subject,
                ContactId: data.result[i].contact_id,
                ActivityType: data.result[i].activitytype,
                StartDate: moment(data.result[i].date_start).format("DD MMM, YYYY HH:mm")
              }
    
              this.meetingPlannedList = this.meetingPlannedList.concat(singleRecord);
            }
            
            event.target.complete();
          });
        }
      });
    } else {
      event.target.disabled = true;
    }
  }

  contactSelected(event, OppId, ContactId, activityType, activityId, activityName, startdate){
    event.preventDefault();
    const dataIds = {
      OppId: OppId,
      ContactId: ContactId,
      ActivityType: activityType,
      ActivityId: activityId,
      ActivityName: activityName,
      OriginURL: "meetings-planned",
      Startdate: startdate
    }
    this.dataStorage.setData("dataIds", dataIds);
    this.nav.navigateRoot(`/employee/view-activity-detail/${OppId}`);
  }
}
