import { Component, OnInit } from '@angular/core';
import * as highchart from "highcharts"

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor() { }

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
  }
}
