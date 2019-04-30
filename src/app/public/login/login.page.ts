import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private toastController: ToastController,
              private authService: AuthenticationService,
              private statusBar: StatusBar,
              private menuController: MenuController) { }

  imgsrc:any = "/assets/fresco-logo-original---115x75.png";
  username:string="";
  password:string="";
  errorMsg:string="";

  ngOnInit() {
    this.statusBar.overlaysWebView(false);
    this.statusBar.show();
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  onSubmit(myForm: NgForm) {
    if(myForm.valid){
      if(myForm.valid){
        this.username = myForm.value.username;
        this.password = myForm.value.password;

        if(this.username !== "test" && this.password !== "test"){
          this.errorMsg = "Invalid Username or Password.";
          this.presentToast();
        } else {
          this.authService.login();
          this.username = "";
          this.password = "";
        }
      } else {
          this.errorMsg = "Please fill out your credentials.";
          this.presentToast();
      }
    }
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message: this.errorMsg,
      duration: 2000,
      color: "medium",
      closeButtonText: "hide"
    });

    toast.present();
  }
}
