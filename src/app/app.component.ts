import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet, ModalController, ToastController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: "Overdue Activities",
      url: "/employee/followup",
    },
    {
      title: "Calls",
      children: [{
          title: "All Calls - AFSV",
          url: "/employee/calls-arrange-fsv",
        },
        {
          title: "All Calls - Except Followups",
          url: "/employee/calls-without-followups",
        },
        {
          title: "All Calls - Followups",
          url: "/employee/calls-followups",
        },
        {
          title: "All Calls - Planned",
          url: "/employee/calls-planned",
        }]
    },
    {
      title: "All Meetings - Planned",
      url: "/employee/meetings-planned",
    },
  ];

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthenticationService,
    public modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.authService.authenticationState.subscribe(state => {
      if(state){
        this.router.navigate(["employee", "followup"]);
      } else {
        this.router.navigate(["login"]);
      }
    })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message, duration: 2000, closeButtonText: "hide"
    });

    toast.present();
  }

  async presentConfirmationLogout() {
    const alert = await this.alertController.create({
      header: "Logout Action",
      message: "Are you sure you want to logout?",
      buttons: ["No", {
        text: "Yes",
        role: "yesAction",
        handler: () => {
          this.authService.logout();
        }
      }]
    });

    await alert.present();
  }

  logout(){
    this.presentConfirmationLogout();
  }
}
