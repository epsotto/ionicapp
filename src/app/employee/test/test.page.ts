import { Component, OnInit } from '@angular/core';
import { DashboardService } from "src/app/services/dashboard.service"
import * as highchart from "highcharts"
import { DataStorageService } from 'src/app/services/data-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private dashboardService:DashboardService,
              private dataStorage: DataStorageService) { }

  ngOnInit() {
    var myChart = highchart.chart('container', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Jane',
        type: undefined,
        data: [1, 0, 4]
      }, {
        name: 'John',
        type: undefined,
        data: [5, 7, 3]
      }]
    });

    this.dataStorage.retrieveCachedData().then((res) => {
      if(res != null){
        this.dashboardService.getDataForChart(res.sessionName, moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'), 
        moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'))
          .then((res) => {
            const data = JSON.parse(res.data);

            console.log(data);
          })
      }
    });
  }
}
