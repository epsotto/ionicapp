import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, NavController, ModalController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FollowupService } from 'src/app/services/followup.service';
import { CallCommentsPage } from '../call-comments/call-comments.page';
import { MultipleNumbersPage } from '../multiple-numbers/multiple-numbers.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-calls-without-followups',
  templateUrl: './calls-without-followups.page.html',
  styleUrls: ['./calls-without-followups.page.scss'],
})
export class CallsWithoutFollowupsPage implements OnInit {

  private msg:string;
  private calledNumber:string;
  private selectedOppId:string;
  private dateCalled:number;
  private retry = 3;
  isLoading:boolean;
  callList = [];

  constructor(private menuController: MenuController,
              private callNumber: CallNumber,
              private toastController: ToastController,
              private statusBar: StatusBar,
              private nav: NavController,
              private dataStorage: DataStorageService,
              private modalController: ModalController,
              private followupService: FollowupService) { }

  ngOnInit() {
    this.menuController.enable(true);
    this.statusBar.overlaysWebView(false);
    this.pullCallList();
  }

  pullCallList() {
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.followupService.getCallList(res.userId, res.sessionName).then((res) => {
          let data = JSON.parse(res.data);
        if(!data.success){
          if(data.error.code === "INVALID_SESSIONID" && this.retry > 0){
            this.pullCallList();
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
              ContactId: data.result[i].contact_id
            }
  
            this.callList = this.callList.concat(singleRecord);
          }
        }

        this.isLoading = false;
        });
      }
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CallCommentsPage,
      componentProps: {
        "oppId": this.selectedOppId,
        "calledNumber": this.calledNumber,
        "dateCalled": this.dateCalled
      }
    });

    modal.onDidDismiss().then(res => {
      this.calledNumber = "";
      this.dateCalled = 0;
      console.log(res);
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
          //this.presentModal();
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

  doRefresh(event) {
    this.callList = [];
    this.pullCallList();
    event.target.disabled = true;
    event.target.complete();
    setTimeout(() => {
      event.target.disabled = false;
    }, 100);
  }
}
