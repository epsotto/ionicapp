import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular'
import { CallLog, CallLogObject } from "@ionic-native/call-log/ngx";

@Component({
  selector: 'app-call-comments',
  templateUrl: './call-comments.page.html',
  styleUrls: ['./call-comments.page.scss'],
})
export class CallCommentsPage implements OnInit {

  @Input() oppId:string;
  msg:string;
  phoneNumbers:string[];
  comment:string = "";
  markDone:boolean = false;

  constructor(private navParams: NavParams, private modalController: ModalController,
              private callLog: CallLog, private toastController : ToastController) { }

  ngOnInit() {
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
        var pastThreeDays = new Date(date.getFullYear(), date.getMonth(), date.getDate()-3).getTime();
        let filters:CallLogObject[] = [{"name": "type",
                  "value": "2",
                  "operator": "=="},
                {
                  "name": "date",
                  "value": pastThreeDays.toString(),
                  "operator": ">="
                }];
        this.callLog.getCallLog(filters).then(data => {
          for(var i=0; i < data.length; i++){
            this.msg = JSON.stringify(data[i]);
            this.phoneNumbers = this.phoneNumbers.concat(data[i].number);
          }
          this.msg = JSON.stringify(data);
          const ouput = {
            markedDone: this.markDone,
            comment: this.comment
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
}
