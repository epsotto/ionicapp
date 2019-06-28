import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @Input() oppId:string;
  @Input() potentialNumber:string;
  comment:string = "";
  markDone:boolean = false;
  setNewActivity:boolean = false;
  activityActionsList = [];
  activityType:string = "";
  minimumDate:string = "";

  constructor(private modal: ModalController) { }

  ngOnInit() {
    this.minimumDate = moment().format("YYYY-MM-DD");
  }

  onSubmit(){
    const ouput = {
      markedDone: this.markDone,
      comment: this.comment
    }
    this.modal.dismiss(ouput);  
  }

  dismissModal() {
    this.modal.dismiss();
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
