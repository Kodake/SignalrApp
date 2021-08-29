import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import * as ChartDataLabels from "chartjs-plugin-datalabels";
import { SignalrChartHubService } from 'src/app/services/signalr-charthub-service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  // All
  public ChartColors: Color[] = [{ backgroundColor: ['#06d6a0', '#ef476f', '#118ab2'] }];
  public ChartLabels: Label[] = ['TotalSalaries', 'FemaleSalaries', 'MaleSalaries'];
  public ChartData: MultiDataSet = [];
  public ChartPlugins: any = [ChartDataLabels];
  public ChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => this.getFormat(value, ctx),
        color: "black",
        align: "center",
        font: {
          size: 15
        }
      }
    },
    animation: {
      duration: 2500,
      animateRotate: true
    }
  };

  // Doughnut
  public doughnutChartType: ChartType = "doughnut";

  constructor(private signalrChartHubService: SignalrChartHubService) { }

  ngOnInit() {
    this.signalrChartHubService.startConnection();
    this.signalrChartHubService.addTransferNotifyChartValuesDataListener();
    this.signalrChartHubService.viewChartValues();
    this.signalrChartHubService.startHttpRequest();
    this.signalrChartHubService.getSalaries().subscribe(value => {
      this.ChartData = [value.totalSalaries, value.femaleSalaries, value.maleSalaries]
    })
  }

  getFormat(value: number, ctx: any) {
    let sum = 0;
    let dataArr = ctx.chart.data.datasets[0].data;
    dataArr.map((data: any) => {
      sum += data;
    });
    let percentage = (value * 100 / sum).toFixed(2) + "%";
    return percentage;
  }
}
