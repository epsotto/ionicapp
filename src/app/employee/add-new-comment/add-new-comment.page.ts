import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ViewActivityDetailService } from 'src/app/services/view-activity-detail.service';

@Component({
  selector: 'app-add-new-comment',
  templateUrl: './add-new-comment.page.html',
  styleUrls: ['./add-new-comment.page.scss'],
})
export class AddNewCommentPage implements OnInit {

  @Input() activityId:string;
  private cachedData:any = [];
  public comment:string = "";

  constructor(private modalController: ModalController,
              private dataStorage: DataStorageService,
              private activityDetailService: ViewActivityDetailService,
              private alertController: AlertController,
              private loader: LoadingController) { }

  ngOnInit() {
    this.dataStorage.retrieveCachedData().then((res) => {
      this.cachedData = res;
    });
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  onSubmit() {
    if(this.comment === "") {
      this.presentAlert("Comment field is empty. Please add a new comment.");
      return;
    }

    this.presentLoader();
    this.activityDetailService.submitComments(this.cachedData.sessionName, 
      this.activityId.substring(this.activityId.indexOf("x")+1, this.activityId.length), "125",
      this.comment, null).then((res) => {
        //const data = JSON.parse(res.data);
        this.loader.dismiss();
        this.modalController.dismiss();
      });
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: msg,
      buttons: ["OK"]
    })

    alert.present();
  }

  async presentLoader() {
    const load = await this.loader.create({
      message: "Please wait..."
    })

    load.present();
  }
}
