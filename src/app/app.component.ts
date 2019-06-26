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
      url: "/employee/followup",
      icon: "home",
    },
    {
      title: "List",
      url: "/list",
      icon: "list",
    },
    {
      title: "Other",
      url: "/employee/dashboard",
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

  logout(){
    this.authService.logout();
  }
}
