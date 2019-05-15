import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';

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
  errorMsg:string="";

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

  onSubmit(myForm: NgForm) {
    if(myForm.valid){
      this.authModel.username = myForm.value.username;
      this.authModel.accessKey = myForm.value.password;
      
      if(!this.successUserName){
        this.userNameDisplay = myForm.value.username;
        this.authService.getChallengeToken(this.authModel.username).then(res => {
          this.errorMsg = res.status.toString();
          this.presentToast();
          if(res.status == 200) {
            this.authModel.token = res.data.token;
            this.successUserName = res.status == 200 ? true : false;
          } 
          // else if(res.success) {
          //   this.authModel.token = res.result.token;
          //   this.successUserName = true;
          // }
        });
      }
      else {
        this.authModel.username = this.userNameDisplay;
        // this.authService.userLogin(this.authModel).then(res => {
        //   this.errorMsg = res.data.sessionId + " : " + res.data.userId;
        //   this.presentToast();
        //   console.log(res);
        // });

        this.authService.login();
        this.authModel = {
            username: "",
            accessKey: "",
            token: ""
          }
      }

      // if(this.authModel.username !== "test" && this.authModel.accessKey !== "test"){
      //   this.errorMsg = "Invalid Username or Password.";
      //   this.presentToast();
      // } else {
      

        // this.authService.login();
      // }
    } else {
        this.errorMsg = "Please fill out your credentials.";
        this.presentToast();
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
