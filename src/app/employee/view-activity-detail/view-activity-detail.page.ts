import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { ToastController, AlertController } from '@ionic/angular';
import { Diagnostic } from "@ionic-native/diagnostic/ngx";

@Component({
  selector: 'app-view-activity-detail',
  templateUrl: './view-activity-detail.page.html',
  styleUrls: ['./view-activity-detail.page.scss'],
})
export class ViewActivityDetailPage implements OnInit {
  oppId:any;
  activeTab:string = "firstTab";
  location:string;
  msg:string;

  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(private dataStorage: DataStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private geo: Geolocation,
              private geoCoder: NativeGeocoder,
              private toast: ToastController,
              private diagnostic: Diagnostic,
              private alert: AlertController){}
  
  ngOnInit(){
    this.oppId = this.route.snapshot.params; //Only needed the params. Data passing is returning undefined.
  }

  changeTabs(tab){
    this.activeTab = tab;
  }

  GetLocation(){
    this.diagnostic.isLocationEnabled().then(res => {
      if(res){
        this.geo.getCurrentPosition().then(res => {
          let longtitude, latitude;
          longtitude = res.coords.longitude;
          latitude = res.coords.latitude;
          
          this.geoCoder.reverseGeocode(latitude, longtitude, this.geoEncoderOptions)
            .then((res: NativeGeocoderResult[]) => {
              this.location = this.generateAddress(res[0]);
            });
        });
      }
      else {
        this.presentAlert("Location", "Please turn on Location on your device.");
      }
    });
    
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
}
