import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController, AlertController } from '@ionic/angular';
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
              private menuController: MenuController,
              private alert: AlertController) { }

  private imgsrc:any = "/assets/fresco-logo-original---115x75.png";
  private errorMsg:string="";
  private passwordVisible:boolean = false;
  private passwordTextType:string="password";
  private userAccess:string = "";

  successUserName:boolean = false;
  userNameDisplay:string = "";
  authModel = {
    username: "",
    accessKey: "",
    token: ""
  }

  ngOnInit() {
    this.statusBar.overlaysWebView(false);
    this.statusBar.show();
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  onSubmit(loginForm: NgForm) {
    if(loginForm.valid){
      this.authModel.username = loginForm.value.username;
      this.authModel.accessKey = loginForm.value.password;
      
      if(!this.successUserName){
        this.userNameDisplay = loginForm.value.username;
        this.successUserName = true;
        this.authService.getChallengeToken(this.authModel.username).then(res => {
          if(res.status) {
            let data = JSON.parse(res.data);
            this.authModel.token = data.result.token;
            this.successUserName = res.status == 200 ? true : false;
          } 
        });
      }
      else {
        this.authModel.username = this.userNameDisplay;
        this.userAccess = this.authModel.accessKey;
        this.authService.userLogin(this.authModel).then(res => {
          let data = JSON.parse(res.data);
          if(data.success){
            this.authService.loginSet(data.result.sessionName, data.result.userId, this.userAccess).then(() => {
              this.authModel = {
                    username: "",
                    accessKey: "",
                    token: ""
                  }
              this.successUserName = false;
            });
          }
        });

        // this.authService.loginSet("64be1a7f5d143f986758b","ercel.peter","FeEFeaTPNrnezmZz").then(() => {
        //   this.authModel = {
        //     username: "",
        //     accessKey: "",
        //     token: ""
        //   }
        //   this.successUserName = false;
        // });
      }
    } else {
        this.errorMsg = "Please fill out your credentials.";
        this.presentToast();
    }
  }

  resetUserName(){
    this.authModel.username = "";
    this.successUserName = false;
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

  async presentAlert(subHeader, msg) {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: subHeader,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  toggleShowPassowrd(){
    this.passwordVisible = !this.passwordVisible;
    this.passwordTextType = this.passwordVisible ? "text" : "password";
  }
}
