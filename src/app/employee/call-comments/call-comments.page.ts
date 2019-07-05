import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular'
import { CallLog, CallLogObject } from "@ionic-native/call-log/ngx";
import * as moment from "moment";

@Component({
  selector: 'app-call-comments',
  templateUrl: './call-comments.page.html',
  styleUrls: ['./call-comments.page.scss'],
})
export class CallCommentsPage implements OnInit {

  @Input() oppId:string;
  @Input() calledNumber:string;
  @Input() dateCalled:string;
  msg:string;
  comment:string = "";
  markDone:boolean = false;
  setNewActivity:boolean = false;
  activityActionsList = [];
  activityType:string = "";
  minimumDate:string = "";

  constructor(private navParams: NavParams,
              private modalController: ModalController,
              private callLog: CallLog, 
              private toastController : ToastController,
              ) { }

  ngOnInit() {
    this.minimumDate = moment().format("YYYY-MM-DD");
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  onSubmit() {
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
          this.msg = JSON.stringify(data);
          const ouput = {
            markedDone: this.markDone,
            comment: this.comment,
            duration: data[0].duration,
            dateCalled: moment(data[0].date).format("DD-MM-YYYY")
          }
          this.modalController.dismiss(ouput);
        });
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

  getActivityActions(){
    if(this.activityType === "call"){
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
    } else if(this.activityType === "meeting"){
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
