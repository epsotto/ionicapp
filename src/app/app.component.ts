import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
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
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthenticationService
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
        this.router.navigate(["employee", "dashboard"]);
      } else {
        this.router.navigate(["login"]);
      }
    })
  }
}
