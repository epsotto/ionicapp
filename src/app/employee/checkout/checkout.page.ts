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
    if(this.activityType === "meeting"){
      this.activityActionsList = [{
        value: "fsv",
        text: "First Site Visit"
      },
      {
        value: "ssv",
        text: "Second Site Visit"
      },
    ]
    } else if(this.activityType === "call"){
      this.activityActionsList = [{
        value: "ffm",
        text: "Follow-up First Meeting"
      },
      {
        value: "fqf",
        text: "Follow-up Quote Feedback"
      }]
    } else {
      this.activityActionsList = [];
    }
  }
}
