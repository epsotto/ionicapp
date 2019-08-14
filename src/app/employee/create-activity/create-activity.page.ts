import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ViewActivityDetailService } from 'src/app/services/view-activity-detail.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.page.html',
  styleUrls: ['./create-activity.page.scss'],
})
export class CreateActivityPage implements OnInit {

  @Input() oppId:string;
  @Input() lastName:string;
  public activityType:string = "";
  public selectedActivityAction:string;
  public activityActionsList = [];
  public taskScheduleDate:string;
  public minimumDate:string;
  public maximumDate:string;
  public taskScheduleTime:string;
  public taskScheduleDuration:string;
  public taskDurationList = [];
  public cachedData = [];

  constructor(private modal: ModalController,
              private dataStorage: DataStorageService,
              private alert: AlertController,
              private viewActivityDetailService: ViewActivityDetailService,
              private loader: LoadingController) { }

  ngOnInit() {
    this.taskScheduleDate = moment().format("YYYY-MM-DD");
    this.taskScheduleTime = moment().format("HH:mm");
    this.minimumDate = moment().format("YYYY-MM-DD");
    this.maximumDate = moment().add(10, "years").format("YYYY-MM-DD");
    this.taskDurationList = [{value: "5", text: "5 mins"},
    {value: "10", text: "10 mins"},
    {value: "15", text: "15 mins"},
    {value: "20", text: "20 mins"},
    {value: "30", text: "30 mins"},
    {value: "60", text: "60 mins"},
    {value: "90", text: "90 mins"},
    {value: "120", text: "120 mins"},
    {value: "180", text: "180 mins"},];

    this.dataStorage.retrieveCachedData().then((res) => {
      this.cachedData = res;
    });
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
        {
        value: "Get Tech Support",
        text: "Get Tech Support"
        },
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

  onSubmit() {
    if(this.activityType === "" || this.selectedActivityAction === "" || this.taskScheduleDate === "" || this.taskScheduleTime === "") {
      this.presentAlert("Please fill-in all required fields.");
      return false;
    }

    this.presentLoader();
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null) {
        this.taskScheduleDuration = this.taskScheduleDuration === "" && this.activityType.toLowerCase() === "call" ? "5" : 
                      this.taskScheduleDuration === "" && (this.activityType.toLowerCase() === "meeting" || this.activityType.toLowerCase() == "task") ? "60" : 
                      this.taskScheduleDuration;
        this.viewActivityDetailService.createCustomActivity(res.sessionName, this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length), 
        "124", this.activityType, this.selectedActivityAction, this.taskScheduleDate, this.taskScheduleTime, this.taskScheduleDuration, 
        "Planned", this.lastName + " - " + this.selectedActivityAction)
          .then((res) => {
            this.loader.dismiss();
            this.modal.dismiss({isSuccess: true});
          });
      }
    });
  }

  dismissModal() {
    this.modal.dismiss({isSuccess: true});
  }

  async presentAlert(msg:string) {
    const alertBox = await this.alert.create({
      header: "Warning",
      message: msg,
      buttons: ["OK"]
    });

    alertBox.present();
  }

  async presentLoader() {
    const load = await this.loader.create({
      message: "Please wait..."
    })

    load.present();
  }
}
