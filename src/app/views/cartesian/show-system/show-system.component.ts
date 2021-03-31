import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-show-system',
  templateUrl: './show-system.component.html'
})
export class ShowSystemComponent implements OnInit {

  constructor() { }

  dataSets: any[];
  ngOnInit(): void {
    this.dataSets = [
      {
        label: 'Scatter Dataset',
        data: [{x: -3, y: 5}, {x: -2, y: 0}, {x: -1, y: -3}, {x: 0, y: -4}, {x: 1, y: -3}, {x: 2, y: 0}, {x: 3, y: 5}],
        borderColor: 'red'
      },
      {
        label: 'Test Dataset',
        data: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: -1, y: -1}, {x: -2, y: -2}, {x: 3, y: 3}],
        borderColor: 'blue'
      }];

    this.createChart();
  }

  addPoint(): void{
    // console.log(this.myChart);
    // this.createChart();
  }

  removePoint(): void{
    // console.log(this.myChart);
    // this.createChart();
  }

  createChart(): void{
    const myChart = new Chart('myChart', {
      type: 'scatter',
      plugins: [{
        beforeDraw: chart => {
          const xAxis = chart.scales['x-axis-1'];
          const yAxis = chart.scales['y-axis-1'];
          const scales = chart.chart.config.options.scales;
          scales.xAxes[0].ticks.padding = yAxis.top - yAxis.getPixelForValue(0) + 6;
          scales.yAxes[0].ticks.padding = xAxis.getPixelForValue(0) - xAxis.right + 6;
        }
      }],
      data: {
        datasets: this.dataSets
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              min: -6,
              max: 6,
              stepSize: 1,
              callback: v => v === 0 ? '' : v
            },
            gridLines: {
              drawTicks: false
            }
          }],
          yAxes: [{
            ticks: {
              min: -6,
              max: 6,
              stepSize: 1,
              callback: v => v === 0 ? '' : v
            },
            gridLines: {
              drawTicks: false
            }
          }]
        }
      }
    });
  }
}
