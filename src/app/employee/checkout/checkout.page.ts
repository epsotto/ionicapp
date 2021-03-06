import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { ViewActivityDetailService } from 'src/app/services/view-activity-detail.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @Input() oppId:string;
  @Input() potentialNumber:string;
  @Input() activityId:string;
  @Input() lastName:string;
  comment:string = "";
  setNewActivity:boolean = false;
  activityActionsList = [];
  activityType:string = "";
  minimumDate:string = "";
  maximumDate:string = "";
  commonReasonList = [];
  selectedReason:string = "";

  selectedActivityAction:string = "";
  taskScheduleDate:string = "";
  taskScheduleTime:string = "";
  taskScheduleDuration:string = "";
  taskDurationList = [];

  private cachedData;

  constructor(private modal: ModalController,
              private alertController: AlertController,
              private activityDetailService: ViewActivityDetailService,
              private dataStorage: DataStorageService,
              private loader: LoadingController) { }

  ngOnInit() {
    this.minimumDate = moment().format("YYYY-MM-DD");
    this.maximumDate = moment().add(10, "years").format("YYYY-MM-DD");
    this.dataStorage.retrieveCachedData().then((res) => {
      this.cachedData = res;
    });

    this.taskDurationList = [{value: "5", text: "5 mins"},
    {value: "10", text: "10 mins"},
    {value: "15", text: "15 mins"},
    {value: "20", text: "20 mins"},
    {value: "30", text: "30 mins"},
    {value: "60", text: "60 mins"},
    {value: "90", text: "90 mins"},
    {value: "120", text: "120 mins"},
    {value: "180", text: "180 mins"},];

    this.commonReasonList = [{value: "Client was not available", text: "Client was not available"},
    {value: "Client not interested", text: "Client not interested"},
    {value: "Client backed out", text: "Client backed out"},
    {value: "Other", text: "Other"}];
  }

  onSubmit(){
    this.presentLoader();

    if(this.setNewActivity){
      if(this.activityType.toLowerCase() === "call") {
        if(this.selectedActivityAction === "" || this.activityType === "" || this.taskScheduleDate === "") {
          this.presentAlert("Some required fields were not filled out. Please fill out required fields marked with red asterisks.");
          window.setTimeout(() => {this.loader.dismiss()}, 100);
          return false;
        }
      } else if(this.activityType.toLowerCase() === "meeting" || this.activityType.toLowerCase() === "task") {
        if(this.activityType === "" || this.selectedActivityAction === "" || this.taskScheduleDate === "" || this.taskScheduleTime === ""){
          this.presentAlert("Some required fields were not filled out. Please fill out required fields marked with red asterisks.");
          window.setTimeout(() => {this.loader.dismiss()}, 100);
          return false;
        }
      }
    }
  
    this.activityDetailService.markActivityComplete(this.cachedData.sessionName, 
      this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length), "44", 
      this.activityId.substring(this.activityId.indexOf("x")+1, this.activityId.length))
        .then((res) => {
          //const data = JSON.parse(res.data);

          // if(data.success){
            this.dataStorage.getCheckedInLocation("location" + this.activityId).then((data) => {
              const userLocation = data != null ? data : "";
              this.comment = this.selectedReason !== "Other" ? this.selectedReason : this.comment;
              this.activityDetailService.submitComments(this.cachedData.sessionName, 
                this.activityId.substring(this.activityId.indexOf("x")+1, this.activityId.length), "125",
                this.comment, userLocation.location).then((res) => {
                  //const data = JSON.parse(res.data);
                  
                  // if(data.success){
                    if(this.setNewActivity && this.activityType.toLowerCase() !== 'task'){
                      const today = new Date();
                      this.taskScheduleTime = this.taskScheduleTime === "" ? moment(today).set({hour: 6, minute: 0}).toString() : this.taskScheduleTime;
                      this.taskScheduleDuration = this.taskScheduleDuration === "" && this.activityType.toLowerCase() === "call" ? "5" : 
                        this.taskScheduleDuration === "" && this.activityType.toLowerCase() === "meeting" ? "60" : this.taskScheduleDuration;
                      this.activityDetailService.createNewActivity(this.cachedData.sessionName, this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length),
                        "124", this.activityType, this.selectedActivityAction, moment(this.taskScheduleDate).format("YYYY/MM/DD"), 
                        moment(this.taskScheduleTime).format("HH:mm"), this.taskScheduleDuration, "Planned")
                          .then((res) => {
                            //const data = JSON.parse(res.data);

                            //if(data.success){
                              this.loader.dismiss();
                              this.modal.dismiss({isSuccess: true});
                            //}
                          });
                    } else if(this.setNewActivity && this.activityType.toLowerCase() === 'task') {
                      this.taskScheduleDuration = this.taskScheduleDuration === "" && this.activityType.toLowerCase() === "call" ? "5" : 
                        this.taskScheduleDuration === "" && this.activityType.toLowerCase() === "meeting" ? "60" : this.taskScheduleDuration;
                      this.activityDetailService.createCustomActivity(this.cachedData.sessionName, this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length), 
                      "124", this.activityType, this.selectedActivityAction, moment(this.taskScheduleDate).format("YYYY-MM-DD"),
                      moment(this.taskScheduleTime).format("HH:mm"), this.taskScheduleDuration, "Planned", this.lastName + " - " + this.selectedActivityAction, 1)
                        .then((res) => {
                          this.loader.dismiss();
                          this.modal.dismiss({isSuccess: true});
                        });
                    } else {
                      this.loader.dismiss();
                      this.modal.dismiss({isSuccess: true});
                    }
                  // }
                });
            });
          // }
        });
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: msg,
      buttons: ["OK"]
    });

    alert.present();
  }

  dismissModal() {
    this.modal.dismiss();
  }

  async presentLoader() {
    const load = await this.loader.create({
      message: "Please wait..."
    });

    load.present();
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
    } else if(this.activityType.toLowerCase() === 'task') {
      this.activityActionsList = [
        // {
        // value: "Get Tech Support",
        // text: "Get Tech Support"
        // },
        {
          value: "Prepare a Quote",
          text: "Prepare a Quote"
        },
        {
          value: "Send Quote Email",
          text: "Send Quote Email"
        },
        {
          value: "Prepare a Requote",
          text: "Prepare a Requote"
        },
        {
          value: "Write Up Job",
          text: "Write Up Job"
        },
        {
          value: "Other",
          text: "Other"
        },
      ];
    } else {
      this.activityActionsList = [];
    }
  }
}
