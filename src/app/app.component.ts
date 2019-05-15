import { Component, ViewChildren, QueryList } from '@angular/core';

import { Platform, IonRouterOutlet, ModalController, MenuController, ActionSheetController, PopoverController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/employee/dashboard",
      icon: "home",
    },
    {
      title: "List",
      url: "/list",
      icon: "list",
    },
    {
      title: "My Follow-ups",
      url: "/employee/followup",
      icon: "today",
    }
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
    private menuController: MenuController,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private toastController: ToastController
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.authService.authenticationState.subscribe(state => {
      if(state){
        this.router.navigate(["employee", "dashboard"]);
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

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(0, async () => {
      // close action sheet
      try {
          const element = await this.actionSheetController.getTop();
          if (element) {
              element.dismiss();
              return;
          }
      } catch (error) {
      }

      // close popover
      try {
          const element = await this.popoverController.getTop();
          if (element) {
              element.dismiss();
              return;
          }
      } catch (error) {
      }

      // close modal
      try {
          const element = await this.modalController.getTop();
          if (element) {
              element.dismiss();
              return;
          }
      } catch (error) {
          console.log(error);

      }

      // close side menua
      try {
          const element = await this.menuController.getOpen();
          if (element !== null) {
              this.menuController.close();
              return;

          }

      } catch (error) {

      }

      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
            outlet.pop();

        } else if (this.router.url === '/home') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
              // this.platform.exitApp(); // Exit from app
              navigator['app'].exitApp(); // work in ionic 4

          } else {
            this.presentToast("Press back again to exit App.");
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
}
