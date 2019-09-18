import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { ViewActivityDetailService } from 'src/app/services/view-activity-detail.service';

@Component({
  selector: 'app-get-support',
  templateUrl: './get-support.page.html',
  styleUrls: ['./get-support.page.scss'],
})
export class GetSupportPage implements OnInit {

  @Input() oppId:string;
  @Input() userId:string;
  @Input() salesStage:string;

  public selectedSupportPerson:string = "";
  public supportPersonsList:any = [];
  public selectedSupportType:string = "";
  public supportTypeList:any = [];
  public comment:string = "";
  public hasTeamDrive:boolean = false;

  constructor(private modal: ModalController,
              private dataService: DataStorageService,
              private activityService: ViewActivityDetailService,
              private loader:LoadingController,
              private alertController:AlertController) { }

  ngOnInit() {
    this.supportPersonsList = [
      {
        text: "Ravin Sharma",
        value: "ravin@frescoshades.co.nz"
      },
      {
        text: "Richard Cummins",
        value: "richard@frescoshades.co.nz"
      },
      {
        text: "Megan Cummins",
        value: "megan@frescoshades.co.nz"
      }
    ];

    this.supportTypeList = [
      {text: "Technical Support", value: "Technical Support"},
      {text: "Quote Support", value: "Quote Support"},
      {text: "Pricing Support", value: "Pricing Support"}
    ];
  }

  onSubmit() {
    this.presentLoader();
    if(this.selectedSupportPerson === "" || this.selectedSupportType === "" || this.comment === "" || !this.hasTeamDrive){
      this.presentAlert("Please complete all required fields before submitting the form.");
      window.setTimeout(() => {this.loader.dismiss()}, 100);
      return;
    }

    this.dataService.retrieveCachedData().then((res) => {
      if(res != null){
        this.activityService.createNewSupportRecord(res.sessionName, res.userId.substring(res.userId.indexOf("x")+1, res.userId.length), 
        this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length), this.selectedSupportPerson, this.selectedSupportType, 
        this.comment)
          .then((res) => {
            this.loader.dismiss();
            this.modal.dismiss({action: "success"});
          });
      }
    });
  }

  dismissModal(){
    this.modal.dismiss({action: "close"});
  }

  async presentLoader(){
    const load = await this.loader.create({
      message: "Please wait..."
    });

    load.present();
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: msg,
      buttons: ["OK"]
    })

    alert.present();
  }
}
