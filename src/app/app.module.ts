import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from "@ionic/storage";
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallCommentsPageModule } from './employee/call-comments/call-comments.module';
import { MultipleNumbersPageModule } from "./employee/multiple-numbers/multiple-numbers.module";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from "@ionic-native/http/ngx";
import { CallLog } from "@ionic-native/call-log/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { CheckoutPageModule } from './employee/checkout/checkout.module';
import { CreateActivityPageModule } from './employee/create-activity/create-activity.module';
import { AddNewCommentPageModule } from './employee/add-new-comment/add-new-comment.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot(), 
    CallCommentsPageModule,
    MultipleNumbersPageModule,
    CheckoutPageModule,
    CreateActivityPageModule,
    AddNewCommentPageModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CallNumber,
    HTTP,
    CallLog,
    Geolocation,
    NativeGeocoder,
    Diagnostic,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
