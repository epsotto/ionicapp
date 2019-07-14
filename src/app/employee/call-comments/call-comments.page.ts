import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController, AlertController } from '@ionic/angular'
import { CallLog, CallLogObject } from "@ionic-native/call-log/ngx";
import * as moment from "moment";
import { ViewActivityDetailService } from 'src/app/services/view-activity-detail.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-call-comments',
  templateUrl: './call-comments.page.html',
  styleUrls: ['./call-comments.page.scss'],
})
export class CallCommentsPage implements OnInit {

  @Input() oppId:string = "";
  @Input() calledNumber:string = "";
  @Input() dateCalled:string = "";
  @Input() activityId:string = "";
  msg:string = "";
  comment:string = "";
  markDone:boolean = false;
  setNewActivity:boolean = false;
  activityActionsList = [];
  activityType:string = "";
  minimumDate:string = "";
  selectedActivityAction:string = "";
  taskScheduleDate:string = "";
  taskScheduleTime:string = "";
  taskScheduleDuration:string = "";
  taskDurationList = [];

  private actualDateCalled:string = "";
  private callDuration:string = "";

  private cachedData:any;

  constructor(private navParams: NavParams,
              private modalController: ModalController,
              private callLog: CallLog, 
              private toastController: ToastController,
              private alertController: AlertController,
              private activityDetailService: ViewActivityDetailService,
              private dataStorage: DataStorageService
              ) { }

  ngOnInit() {
    this.minimumDate = moment().format("YYYY-MM-DD");
    this.taskDurationList = [{value: "5", text: "5 mins"},
    {value: "5", text: "5 mins"},
    {value: "10", text: "10 mins"},
    {value: "15", text: "15 mins"},
    {value: "20", text: "20 mins"},
    {value: "30", text: "30 mins"},
    {value: "60", text: "60 mins"},
    {value: "90", text: "90 mins"},
    {value: "120", text: "120 mins"},
    {value: "130", text: "130 mins"},];

    this.dataStorage.retrieveCachedData().then((res) => {
      this.cachedData = res;
    });
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  onSubmit() {
    if(this.markDone){
      this.callLog.hasReadPermission().then(hasPermission => {
        if(!hasPermission){
          this.callLog.requestReadPermission();
        } else {
          var date = new Date();
          let filters:CallLogObject[] = [
                  {"name": "number",
                    "value": this.calledNumber,
                    "operator": "=="
                  },
                  {"name": "type",
                    "value": "2",
                    "operator": "=="},
                  {
                    "name": "date",
                    "value": this.dateCalled,
                    "operator": ">="
                  }];
          this.callLog.getCallLog(filters).then(data => {
            this.actualDateCalled = moment(data[0].date).format("DD-MM-YYYY");
            this.callDuration = data[0].duration;

            this.activityDetailService.markActivityComplete(this.cachedData.sessionName, 
              this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length), "44", 
              this.activityId.substring(this.activityId.indexOf("x")+1, this.activityId.length))
                .then((res) => {
                  const data = JSON.parse(res.data);
      
                  if(data.success){
                    this.activityDetailService.submitComments(this.cachedData.sessionName, 
                      this.activityId.substring(this.activityId.indexOf("x")+1, this.activityId.length), "125",
                      this.comment).then((res) => {
                        const data = JSON.parse(res.data);
                        
                        if(data.success){
                          this.activityDetailService.createNewActivity(this.cachedData.sessionName, this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length),
                            "124", "Mobile Call", "Mobile Call : Call Logging", moment(this.actualDateCalled).format("YYYY/MM/DD"), 
                            moment(this.actualDateCalled).format("HH:mm"), this.callDuration, "Held")
                              .then((res) => {
                                const data = JSON.parse(res.data);

                                if(data.success){
                                  if(this.setNewActivity){
                                    this.activityDetailService.createNewActivity(this.cachedData.sessionName, this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length),
                                    "124", this.activityType, this.selectedActivityAction, moment(this.taskScheduleDate).format("YYYY/MM/DD"), 
                                    moment(this.taskScheduleTime).format("HH:mm"), this.taskScheduleDuration, "Planned")
                                      .then((res) => {
                                        const data = JSON.parse(res.data);
        
                                        if(data.success){
                                          
                                        }
                                        this.modalController.dismiss();
                                      });
                                  }
                                  else {
                                    this.modalController.dismiss();
                                  }
                                }
                              });
                        }
                      });
                  }
                });
          });
        }
      });

      // this.activityDetailService.markActivityComplete(this.cachedData.sessionName, 
      //   this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length), "44", 
      //   this.activityId.substring(this.activityId.indexOf("x")+1, this.activityId.length))
      //     .then((res) => {
      //       const data = JSON.parse(res.data);

      //       if(data.success){
      //         this.activityDetailService.submitComments(this.cachedData.sessionName, 
      //           this.activityId.substring(this.activityId.indexOf("x")+1, this.activityId.length), "125",
      //           this.comment).then((res) => {
      //             const data = JSON.parse(res.data);
                  
      //             if(data.success){
      //               if(this.setNewActivity){
      //                 this.activityDetailService.createNewActivity(this.cachedData.sessionName, this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length),
      //                 "124", this.activityType, this.selectedActivityAction, moment(this.taskScheduleDate).format("YYYY/MM/DD"), 
      //                 moment(this.taskScheduleTime).format("HH:mm"), this.taskScheduleDuration)
      //                   .then((res) => {
      //                     console.log(res);
      //                     this.modalController.dismiss();
      //                   });
      //               } else {          
      //                 this.modalController.dismiss();
      //               }
      //             }
      //           });
      //       }
      //     });

    } else {
      this.presentAlert("Activity must be marked completed/held before submission.");
    }
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: msg,
      buttons: ["OK"]
    })

    alert.present();
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

  getActivityActions(){
    if(this.activityType.toLowerCase() === "call"){
      this.activityActionsList = [{
        value: "Call : Arrange First Site Visit",
        text: "Call : Arrange First Site Visit"
      },
      {
        value: "Call : Arrange Quote Presentation",
        text: "Call : Arrange Quote Presentation"
      },
      {
        value: "Call : Arrange Quote Presentation",
        text: "Call : Arrange Quote Presentation"
      },
      {
        value: "Call : Quote Follow Up",
        text: "Call : Quote Follow Up"
      },
      {
        value: "Call : Additional Info From Customer",
        text: "Call : Additional Info From Customer"
      },
      {
        value: "Call : Arrange Site Measurement",
        text: "Call : Arrange Site Measurement"
      },
      {
        value: "Call : Customer Feedback",
        text: "Call : Customer Feedback"
      },
      {
        value: "Call : Other",
        text: "Call : Other"
      }];
    } else if(this.activityType.toLowerCase() === "meeting"){
      this.activityActionsList = [{
        value: "Meeting : First Site Visit",
        text: "Meeting : First Site Visit"
      },
      {
        value: "Meeting : Quote Presentation",
        text: "Meeting : Quote Presentation"
      },
      {
        value: "Meeting : Quote Presentation",
        text: "Meeting : Quote Presentation"
      },
      {
        value: "Meeting : Final Site Measurement",
        text: "Meeting : Final Site Measurement"
      },
      {
        value: "Meeting : Site Visit",
        text: "Meeting : Site Visit"
      },
      {
        value: "Meeting : Additional Customer Info",
        text: "Meeting : Additional Customer Info"
      },
      {
        value: "Meeting : Customer Feedback",
        text: "Meeting : Customer Feedback"
      },
      {
        value: "Meeting : Other",
        text: "Meeting : Other"
      },];
    } else {
      this.activityActionsList = [];
    }
  }
}
