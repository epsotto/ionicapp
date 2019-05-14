import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CallNumber } from "@ionic-native/call-number/ngx";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { CallCommentsPage } from '../call-comments/call-comments.page';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.page.html',
  styleUrls: ['./followup.page.scss'],
})
export class FollowupPage implements OnInit {
  private followupList = [];
  private msg: string = "";
  private selectedOppId:string = "";

  constructor(private menuController: MenuController,
              private authService: AuthenticationService,
              private callNumber: CallNumber,
              private toastController: ToastController,
              private statusBar: StatusBar,
              private nav: NavController,
              private dataStorage: DataStorageService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.menuController.enable(true);
    this.statusBar.overlaysWebView(false);
    this.followupList = [
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
    ];
  }

  logout(){
    this.authService.logout();
  }

  DialNumber(clientNumber){
    this.msg = clientNumber;
    this.presentToast();

    this.callNumber.callNumber(clientNumber, true)
    .then(res => {
      this.msg = "Called " + clientNumber;
      this.presentToast();
      this.presentModal();
    }).catch(err => {
      this.msg = "Error in dialer " + err;
      this.presentToast();
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CallCommentsPage,
      componentProps: {
        "oppId": this.selectedOppId,
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

  contactSelected(event, OppId){
    event.preventDefault();
    this.dataStorage.setData("OppId", OppId);
    this.nav.navigateRoot(`/employee/view-activity-detail/${OppId}`);
  }

  markDone(oppId){
    this.selectedOppId = oppId;
    this.presentModal();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.followupList = [{
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: "+64272208855",
        EventAction: "Call: Quote Follow Up"
      }];
      event.target.complete();
    }, 2000);
  }
}
