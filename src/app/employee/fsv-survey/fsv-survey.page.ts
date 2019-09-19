import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ViewActivityDetailService } from 'src/app/services/view-activity-detail.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-fsv-survey',
  templateUrl: './fsv-survey.page.html',
  styleUrls: ['./fsv-survey.page.scss'],
})
export class FsvSurveyPage implements OnInit {

  @Input() clientName:string;
  @Input() oppId:string;
  public contactName:string = "";
  public descriptionJob:string = "";
  public selectedExperience:string = "";
  public selectedExperienceList:any = [];
  public selectedOtherSolution:string = "";
  public otherSolutionList:any = [];
  public selectedOtherQuotes:string = "";
  public otherQuotesObtainedList:any = [];
  public preferredRoofMaterial:string = "";
  public budgetCostExpectations:string = "";
  public costEstimate:string = "";
  public selectedNeedFinanceValue:string = "";
  public needFinanceList:any = [];
  public comment:string = "";

  constructor(private modal:ModalController,
              private alertController:AlertController,
              private loader:LoadingController,
              private viewDetailService:ViewActivityDetailService,
              private dataStorage:DataStorageService) { }

  ngOnInit() {
    this.selectedExperienceList = [
      {text: "Fresco", value:"Fresco"},
      {text: "Other", value:"Other"},
      {text: "No", value:"No"},
      {text: "Didn't Ask", value:"Didn't Ask"}
    ];

    this.otherSolutionList = [
      {text:"Louvre Roof", value: "Louvre Roof"},
      {text:"Retractable Fabric Roof", value: "Retractable Fabric Roof"},
      {text:"Shade Sail", value: "Shade Sail"},
      {text:"Timber Pergola", value: "Timber Pergola"},
      {text:"Canopy", value: "Canopy"},
      {text:"Didn't Ask", value: "Didn't Ask"},
      {text:"None", value: "None"}
    ];

    this.otherQuotesObtainedList = [
      {text: "Archgola", value: "Archgola"},
      {text: "Shade Direct", value: "Shade Direct"},
      {text: "Cool Awnings", value: "Cool Awnings"},
      {text: "Bowranda", value: "Bowranda"},
      {text: "Total Cover", value: "Total Cover"},
      {text: "Awesome Awnings", value: "Awesome Awnings"},
      {text: "Other", value: "Other"},
      {text: "Didn't Ask", value: "Didn't Ask"},
      {text: "None", value: "None"}
    ];

    this.needFinanceList = [
      {text: "No", value: "No"},
      {text: "Yes", value: "Yes"},
      {text: "Didn't Ask", value: "Didn't Ask"},
    ];

    this.contactName = this.clientName;
  }

  onSubmit(){
    this.presentLoader();
    if(this.contactName === "" || this.descriptionJob === "" || this.selectedExperience === ""
      || this.selectedOtherQuotes === "" || this.preferredRoofMaterial === ""
      || this.budgetCostExpectations === "" || this.costEstimate === ""
      || this.selectedNeedFinanceValue === "" || this.comment === "") {
        this.presentAlert("Please fill out all fields in this form before submitting.");
        this.loader.dismiss();
        return;
      }

    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null) {
        this.viewDetailService.createNewFsvSurvey(res.sessionName, this.oppId.substring(this.oppId.indexOf("x")+1, this.oppId.length), 
        this.contactName, this.descriptionJob, this.selectedExperience, this.selectedOtherSolution, this.selectedOtherQuotes, 
        this.preferredRoofMaterial, this.budgetCostExpectations, this.costEstimate, this.selectedNeedFinanceValue, this.comment)
        .then((res) => {
          this.loader.dismiss();
          this.modal.dismiss({action: "success"});
        });
      }
    })
  }

  async presentLoader() {
    const load = await this.loader.create({
      message: "Please wait..."
    });

    load.present();
  }

  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: "Alert!",
      message: msg,
      buttons: ["OK"]
    });

    alert.present();
  }

  dismissModal() {
    this.modal.dismiss({action: "close"});
  }
}
