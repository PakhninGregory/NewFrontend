import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import {HttpErrorResponse} from '@angular/common/http';
import {CartesianService} from '../../../core/services/Cartesian.service';

@Component({
  selector: 'app-show-system',
  templateUrl: './show-system.component.html'
})
export class ShowSystemComponent implements OnInit {

  constructor(private service: CartesianService) { }

  dataSets: any[];
  ModalTitle: string;
  ActivateAddEditComp: boolean;
  obj: any;

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

  addClick(): void{
    this.obj = {
      id: 0,
      x: 0,
      y: 0,
    };
    this.ModalTitle = 'Add Point';
    this.ActivateAddEditComp = true;
  }

  editClick(item): void{
    this.obj = item;
    this.ModalTitle = 'Edit Point';
    this.ActivateAddEditComp = true;
  }

  deleteClick(item): void{
    if (confirm('Вы уверены, что хотите удалить эту точку?')){
      this.service.deletePoint(item.id).subscribe(
        (error: HttpErrorResponse) => {
          this.refreshList();
        },
      );
    }
  }

  closeClick(): void{
    this.ActivateAddEditComp = false;
    // this.refreshList();
  }

  refreshList(): void{
    this.service.getPointList().subscribe(
      (data: any) => {

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
