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

  constructor(private navParams: NavParams, private modalController: ModalController,
              private callLog: CallLog, private toastController : ToastController) { }

  ngOnInit() {
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  SubmitComment() {
    this.callLog.hasReadPermission().then(hasPermission => {
      if(!hasPermission){
        this.callLog.requestReadPermission();
      }
    });
    
    var date = new Date();
    var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let filters:CallLogObject[] = [{"name": "type",
              "value": "2",
              "operator": "=="}];
    this.callLog.getCallLog(filters).then(data => {
      this.msg = JSON.stringify(data);
      this.presentToast();
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
