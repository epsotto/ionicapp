import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ToastController, AlertController, ModalController, LoadingController, Platform, NavController, ActionSheetController } from '@ionic/angular';
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { CheckoutPage } from '../checkout/checkout.page';
import { ViewActivityDetailService } from 'src/app/services/view-activity-detail.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallCommentsPage } from '../call-comments/call-comments.page';
import { CreateActivityPage } from '../create-activity/create-activity.page'
import * as moment from 'moment';
import { AddNewCommentPage } from '../add-new-comment/add-new-comment.page';
import { GetSupportPage } from '../get-support/get-support.page';
import { FsvSurveyPage } from '../fsv-survey/fsv-survey.page';

@Component({
  selector: 'app-view-activity-detail',
  templateUrl: './view-activity-detail.page.html',
  styleUrls: ['./view-activity-detail.page.scss'],
})
export class ViewActivityDetailPage implements OnInit {
  oppId:string;
  private dataIds:any;
  activeTab:string = "firstTab";
  checkIn:any = {
    location: "",
    time: "",
  }
  msg:string;

  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  
  public isCheckIn:boolean = false;
  public contactName:string = "";
  public clientAddress:string = "";
  public mobilePhone:string = "";
  public homePhone:string = "";
  public officePhone:string = "";
  public otherNumber:string = "";
  public primaryEmail:string = "";
  public mailToPrimaryEmail:string = "";
  public secondaryEmail:string = "";
  public mailToSecondaryEmail:string = "";
  public doNotCallFlag:string = "";

  public potentialNumber:string = "";
  public opportunityName:string = "";
  public oppDescription:string = "";
  public jobInclusion:string = "";
  public salesStage:string = "";
  public driveFolder:string = "";
  public activityName:string = "";
  public startDateTime:string = "";
  public backToOriginURL:string = "";
  public commentList = [];
  public toggleCommentList:boolean = false;
  
  private originURL:string = "";
  private activityType:string = "";
  private activityId:string = "";
  private lastName:string = "";
  private eventAction:string = "";
  private userId:string = "";
  private firstName:string = "";

  constructor(private dataStorage: DataStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private geo: Geolocation,
              private geoCoder: NativeGeocoder,
              private toast: ToastController,
              private diagnostic: Diagnostic,
              private alert: AlertController,
              private modal: ModalController,
              private loadingController: LoadingController,
              private viewActivityDetailService: ViewActivityDetailService,
              private callNumber: CallNumber,
              private platform: Platform,
              private nav: NavController,
              private actionSheetController: ActionSheetController){
                this.platform.backButton.subscribeWithPriority(0, () => {
                    this.redirectToOriginPage();
                  });
              }
  
  ngOnInit(){
    this.oppId = this.route.snapshot.params.OppId; //Only needed the params. Data passing is returning undefined.
    this.dataIds = this.dataStorage.getData("dataIds");
    this.getOpportunityDetails(this.oppId);
    this.getClientDetails(this.dataIds.ContactId);
    this.activityType = this.dataIds.ActivityType;
    this.activityId = this.dataIds.ActivityId;
    this.activityName = this.dataIds.ActivityName;
    this.originURL = this.dataIds.OriginURL;
    this.backToOriginURL = "/employee/" + this.originURL;
    this.startDateTime = this.dataIds.StartDate;
    this.eventAction = this.dataIds.EventName;

    this.dataStorage.getCheckedInLocation("location"+this.activityId).then(res => {
      this.isCheckIn = res === null ? true : false;
    });

    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null) {
        this.userId = res.userId;
        this.viewActivityDetailService.getOpportunityLatestComments(this.oppId, res.sessionName).then((res) => {
          const data = JSON.parse(res.data);

          if(data.success) {
            data.result.sort((a, b) => {
              if(moment(a.createdtime).format("x") < moment(b.createdtime).format("x")){
                return 1;
              } else if (moment(a.createdtime).format("x") > moment(b.createdtime).format("x")){
                return -1;
              }
            });
            this.commentList = data.result;
            this.commentList.forEach((el) => {
              el.createdtime = moment(el.createdtime).format("DD MMM, YYYY HH:mm");
              return el;
            })
          }
        });
      }
    });
  }

  getOpportunityDetails(oppId:string){
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.viewActivityDetailService.getOppDetailData(res.sessionName, oppId).then((res) => {
          const data = JSON.parse(res.data);
          
          if(data.success){
            this.potentialNumber = data.result[0].potential_no;
            this.opportunityName = data.result[0].potentialname;
            this.oppDescription = data.result[0].description;
            this.jobInclusion = data.result[0].cf_800;
            this.driveFolder = data.result[0].cf_751 != "" ? "https://drive.google.com/drive/folders/" + data.result[0].cf_751 : 
            (data.result[0].cf_1549 != "" ? "https://drive.google.com/drive/folders/" + data.result[0].cf_1549 : "");
            this.salesStage = data.result[0].sales_stage;
          }
        })
      }
    });
  }

  getClientDetails(contactId:string){
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.viewActivityDetailService.getClientDetailData(res.sessionName, contactId).then((res) => {
          const data = JSON.parse(res.data);
          if(data.success){
            this.lastName = data.result[0].lastname;
            this.firstName = data.result[0].firstname;
            this.contactName = data.result[0].lastname + ", " + data.result[0].firstname;
            this.clientAddress = data.result[0].mailingstreet  + ", " + 
                                data.result[0].mailingcity + ", " + 
                                data.result[0].mailingstate + ", " + 
                                data.result[0].mailingcountry + ", " +
                                data.result[0].mailingzip;
            this.mobilePhone = data.result[0].mobile;
            this.homePhone = data.result[0].homephone;
            this.officePhone = data.result[0].phone;
            this.otherNumber = data.result[0].otherphone;
            this.primaryEmail = data.result[0].email;
            this.mailToPrimaryEmail = "mailto:" + data.result[0].email;
            this.secondaryEmail = data.result[0].secondaryemail;
            this.mailToSecondaryEmail = "mailto:" + data.result[0].secondaryEmail;
            this.doNotCallFlag = data.result[0].donotcall === "0" ? "No" : "Yes";
          }
        });
      }
    });
  }

  changeTabs(tab){
    this.activeTab = tab;
  }

  openClientAddress(){
    if(this.clientAddress != ""){
      let label = encodeURI(this.clientAddress);
          label = label.replace(",","%2C");
          window.open("https://www.google.com/maps/search/?api=1&query="+ label);
    }
  }

  getLocation(){
    this.showLoader();
    this.diagnostic.isLocationEnabled().then(res => {
      if(res){
        this.geo.getCurrentPosition().then(res => {
          let longtitude, latitude;
          longtitude = res.coords.longitude;
          latitude = res.coords.latitude;
          this.geoCoder.reverseGeocode(latitude, longtitude, this.geoEncoderOptions)
            .then((res: NativeGeocoderResult[]) => {
              this.checkIn = {
                location: this.generateAddress(res[0]),
                time: new Date().getTime()
              }

              this.dataStorage.saveCheckedInLocation("location" + this.activityId, this.checkIn).then((result) => {
                this.isCheckIn = false;
                this.loadingController.dismiss();
              });
            });
        }).catch(err => {
          this.msg = err;
          this.presentToast();
        });
      }
      else {
        window.setTimeout(() => {this.loadingController.dismiss();}, 100);
        this.presentAlert("Location", "Please turn on Location on your device.");
      }
    });
    // this.checkIn.location = "here";
  }

  checkOutFromSite(){
    this.presentCheckoutModal();
  }
  
  callSupportNumber(){
    this.presentActionSheet();
  }

  async presentActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: "Contact Persons:",
      buttons:[{
        text: "Richard: 0800999574",
        handler: () => {this.dialSupportNumber("0800999574");}
      },
      {
        text: "Ravin: 0211359467",
        handler: () => {this.dialSupportNumber("0211359467");}
      }
    ]
    });

    await actionSheet.present();
  }

  callClientNumber(number){
    if(number !== ""){
      this.callNumber.callNumber(number, true).then(res => {
        this.msg = "Called " + number;
        this.presentToast();
        if(this.activityType.toLowerCase() === "call"){
          const today = (new Date).getTime();
          this.triggerMarkingCall(number, today);
        }
      });
    }
  }

  dialSupportNumber(number) {
    this.callNumber.callNumber(number, true).then(res => {
      this.msg = "Called " + number;
      this.presentToast();
    });
  }

  showLoader(){
    const loader = this.loadingController.create({
      message: "Loading..."
    }).then(res => {res.present()});
  }

  generateAddress(addressObj){
    let obj = [];
        let address = "";
        for (let key in addressObj) {
          obj.push(addressObj[key]);
        }
        obj.reverse();
        for (let val in obj) {
          if(obj[val].length)
          address += obj[val]+', ';
        }
      return address.slice(0, -2);
  }

  async presentToast(){
    const toast = await this.toast.create({
      message: this.msg,
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

    alert.present();
  }

  async presentCheckoutModal(){
    const modal = await this.modal.create({
      component: CheckoutPage,
      componentProps: {
        "oppId": this.oppId,
        "potentialNumber": this.potentialNumber,
        "activityId": this.activityId,
        "lastName": this.lastName
      }
    });

    modal.onDidDismiss().then((res) => {
      if(res.data.isSuccess){
        this.dataStorage.removeCheckedInLocation("location" + this.activityId).then((res) => {
            this.isCheckIn = true;
            this.redirectToOriginPage();
        });
      }
    });

    modal.present();
  }

  markActivityComplete(){
    if(this.activityType.toLowerCase() === "call"){
      this.ShowCallCommentModal();
    } else {
      this.presentCheckoutModal();
    }
  }

  async ShowCallCommentModal(){
    const modal = await this.modal.create({
      component: CallCommentsPage,
      componentProps: {
        "oppId": this.oppId,
        "activityId": this.activityId,
        "calledNumber": "",
        "dateCalled": "",
        "isDirectlyMarkedComplete": true,
        "lastName": this.lastName,
        "eventName": this.eventAction
      }
    });

    modal.onDidDismiss().then((res) => {
      if(res.data.isSuccess){
        this.redirectToOriginPage();
      } else {
        this.presentAlert("Something went wrong.", "Please contact Support if this issue persists.");
      }
    });

    modal.present();
  }

  async triggerMarkingCall(dialedNumber:string, today:number){
    const modal = await this.modal.create({
      component: CallCommentsPage,
      componentProps: {
        "oppId": this.oppId,
        "activityId": this.activityId,
        "calledNumber": dialedNumber,
        "dateCalled": today,
        "isDirectlyMarkedComplete": false,
        "lastName": this.lastName,
        "eventName": this.eventAction
      }
    });

    modal.onDidDismiss().then((res) => {
      if(res.data.isSuccess){
        this.redirectToOriginPage();
      } else {
        this.presentAlert("Something went wrong.", "Please contact Support if this issue persists.");
      }
    });

    modal.present();
  }

  redirectToOriginPage() {
    if(this.router.url.indexOf("employee/view-activity-detail/") > -1){
      this.nav.navigateRoot(this.backToOriginURL);
    }
  }

  changeBackground() {
    const today = new Date().getTime();
    if(new Date(this.startDateTime).getTime() < today){
      return "overdue-activity";
    } else if(new Date(this.startDateTime).getTime() >= today){
      return "planned-activity";
    }
  }

  async createNewActivity(){
    const modal = await this.modal.create({
      component: CreateActivityPage,
      componentProps: {
        oppId: this.oppId,
        lastName: this.lastName,
      }
    });

    modal.present();
  }

  showCommentList(){
    this.toggleCommentList = !this.toggleCommentList;
  }

  addNewComment(){
    this.addNewCommentModal();
  }

  async addNewCommentModal(){
    const modal = await this.modal.create({
      component: AddNewCommentPage,
      componentProps: {
        oppId: this.oppId
      }
    });

    modal.present();
  }

  getSupport() {
    this.getSupportModal();
  }

  async getSupportModal(){
    const modal = await this.modal.create({
      component: GetSupportPage,
      componentProps: {
        oppId: this.oppId,
        userId: this.userId,
        salesStage: this.salesStage
      }
    });

    modal.onDidDismiss().then((res) => {
      if(res != null) {
        if(res.data.action === "success"){
          this.msg = "Support Ticket successfully created.";
          this.presentToast();
        }
      }
    })

    modal.present();
  }

  createFsvSurvey(){
    this.FsvSurveyModal();
  }

  async FsvSurveyModal() {
    const modal = await this.modal.create({
      component: FsvSurveyPage,
      componentProps: {
        oppId: this.oppId,
        clientName: this.firstName !== "" && this.lastName !== "" ? this.firstName + " " + this.lastName : 
                      (this.firstName === "" ? this.lastName : this.firstName)
      }
    });

    modal.onDidDismiss().then((res) => {
      if(res != null) {
        if (res.data.action === "success"){
          this.msg = "Fresco Survey Created.";
          this.presentToast();
        }
      }
    })

    modal.present();
  }
}
