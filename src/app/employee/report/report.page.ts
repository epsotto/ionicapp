import { Component, OnInit } from '@angular/core';
import { DashboardService } from "src/app/services/dashboard.service"
import * as highchart from "highcharts"
import { DataStorageService } from 'src/app/services/data-storage.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  startDateRange:string = "";
  endDateRange:string = "";

  constructor(private dashboardService:DashboardService,
              private dataStorage: DataStorageService,
              private alert: AlertController) { }

  ngOnInit() {
    this.startDateRange = moment().startOf('year').format('YYYY-MM-DD');
    this.endDateRange = moment().endOf('year').format('YYYY-MM-DD');
    this.highChartSalesByRep(this.startDateRange, this.endDateRange);
  }

  highChartSalesByRep(startDate:string, endDate:string) {
    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.dashboardService.getDataForChart(res.sessionName, startDate, 
          endDate, "SalesByRep")
          .then((res) => {
            const data = JSON.parse(res.data);
            let convertData = [];

            for (var i = 0; i < data.result.length; i++){
              let dataLine = {
                name: data.result[i].rep,
                data: [parseInt(data.result[i].totalsales)]
              };

              convertData = convertData.concat(dataLine);
              
              var myChart = highchart.chart('container', {
                chart: {
                  type: 'column'
                },
                title: {
                  text: 'Sales by Sales Rep'
                },
                xAxis: {
                  categories: ["Sales Representatives"]
                },
                yAxis: {
                  min: 0,
                  title: {
                    text: 'Total Sales ($)'
                  }
                },
                series: convertData
              });
            }
          })
      }
    });
  }

  onSubmit(){
    if(parseInt(moment(this.startDateRange).format("x")) > parseInt(moment(this.endDateRange).format("x"))) {
      this.presentAlert("Start Date is greater than End Date.");
      return false;
    }

    this.highChartSalesByRep(this.startDateRange, this.endDateRange);
  }

  async presentAlert(msg){
    const alert = await this.alert.create({header: "Warning!",
        message: msg,
        buttons: ["OK"]
      });

    alert.present();
  }
}
