import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ToastController, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { CheckoutPage } from '../checkout/checkout.page';
import * as moment from "moment";

@Component({
  selector: 'app-view-activity-detail',
  templateUrl: './view-activity-detail.page.html',
  styleUrls: ['./view-activity-detail.page.scss'],
})
export class ViewActivityDetailPage implements OnInit {
  oppId:any;
  activeTab:string = "firstTab";
  clientAddress:string = "Sky Tower, Victoria St W, Auckland, 1010";
  clientLocation:string = "";
  checkIn:any = {
    location: "",
    time: "",
  }
  msg:string;
  checkOut:any = {
    location: "",
    time: "",
  }

  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  
  mobilePhone:string = "0212124422";
  homePhone:string = "021231231";
  officePhone:string = "023213213";
  otherNumber:string = "";

  constructor(private dataStorage: DataStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private geo: Geolocation,
              private geoCoder: NativeGeocoder,
              private toast: ToastController,
              private diagnostic: Diagnostic,
              private alert: AlertController,
              private modal: ModalController,
              private loadingController: LoadingController){}
  
  ngOnInit(){
    this.oppId = this.route.snapshot.params; //Only needed the params. Data passing is returning undefined.
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
            });
        }).catch(err => {
          this.msg = err;
          this.presentToast();
        });
      }
      else {
        this.presentAlert("Location", "Please turn on Location on your device.");
      }
    });
    // this.checkIn.location = "here";
  }

  checkOutFromSite(){
    this.showLoader();
    this.diagnostic.isLocationEnabled().then(res => {
      if(res){
        this.geo.getCurrentPosition().then(res => {
          let longtitude, latitude;
          longtitude = res.coords.longitude;
          latitude = res.coords.latitude;
          
          this.geoCoder.reverseGeocode(latitude, longtitude, this.geoEncoderOptions)
            .then((res: NativeGeocoderResult[]) => {
              this.loadingController.dismiss();
              this.checkIn={
                location: "",
                time: "",
              }
              this.checkOut ={
                location: this.generateAddress(res[0]),
                time: new Date().getTime()
              };
              this.presentCheckoutModal();
            });
        });
      }
      else {
        this.presentAlert("Location", "Please turn on Location on your device.");
      }
    });

    // this.presentCheckoutModal();
  }
  
  callSupportNumber(){
    
  }

  callNumber(number){
    console.log(number);
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

    await alert.present();
  }

  async presentCheckoutModal(){
    const modal = await this.modal.create({
      component: CheckoutPage,
      componentProps: {
        "oppId": this.oppId.OppId
      }
    });

    modal.onDidDismiss().then(res => {
      if(res.data != "" && typeof(res.data) !== 'undefined'){
        this.checkIn = {
          location: "",
          time: "",
        }
        this.presentAlert("Checked Out", "You have checked out from the client site at "+ moment(new Date()).format("LLL") +".");
      }
    });

    modal.present();
  }
}
