import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { MenuController, ToastController, NavController, ModalController, IonRouterOutlet, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CallNumber } from "@ionic-native/call-number/ngx";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { CallCommentsPage } from '../call-comments/call-comments.page';
import { MultipleNumbersPage } from '../multiple-numbers/multiple-numbers.page';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.page.html',
  styleUrls: ['./followup.page.scss'],
})
export class FollowupPage implements OnInit {
  public followupList = [];
  private msg: string = "";
  private selectedOppId:string = "";

  @ViewChild(IonRouterOutlet) routerOutlets : QueryList<IonRouterOutlet>;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  constructor(private menuController: MenuController,
              private authService: AuthenticationService,
              private callNumber: CallNumber,
              private toastController: ToastController,
              private statusBar: StatusBar,
              private nav: NavController,
              private dataStorage: DataStorageService,
              private modalController: ModalController,
              private platform: Platform,
              private router: Router) { 
                this.backButtonEvent();
              }

  ngOnInit() {
    this.menuController.enable(true);
    this.statusBar.overlaysWebView(false);
    this.followupList = [
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855","+64272208855","+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855","+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855","+64272208855","+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
    ];
  }

  logout(){
    this.authService.logout();
  }

  DialNumber(clientNumber){
    if(clientNumber.length > 1) {
      this.presentMultipleNumbersModal(clientNumber);
    }
    else {
      this.callNumber.callNumber(clientNumber[0], true)
        .then(res => {
          this.msg = "Called " + clientNumber[0];
          this.presentToast();
          this.presentModal();
        }).catch(err => {
          this.msg = "Error in dialer " + err;
          this.presentToast();
        });
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CallCommentsPage,
      componentProps: {
        "oppId": this.selectedOppId,
      }
    });

    modal.onDidDismiss().then(res => {
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
          this.presentToast();
          this.presentModal();
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
        ContactNumber: ["+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855"],
        EventAction: "Call: Quote Follow Up"
      },
      {
        OppId: "4192",
        OppName: "John | Canopy | Flat 62, 26 James Street, Glenfield",
        Client: "John Doe",
        ContactNumber: ["+64272208855"],
        EventAction: "Call: Quote Follow Up"
      }];
      event.target.complete();
    }, 2000);
  }

  backButtonEvent(){
    this.platform.backButton.subscribeWithPriority(0, async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        this.msg = "back button pressed.";
        this.presentToast();
        if (outlet && outlet.canGoBack()) {
            outlet.pop();

        } else if (this.router.url === '/home') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
              // this.platform.exitApp(); // Exit from app
              navigator['app'].exitApp(); // work in ionic 4

          } else {
            this.msg = "Press back again to exit App.";
            this.presentToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
}
