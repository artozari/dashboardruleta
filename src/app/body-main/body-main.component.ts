import { Component, AfterViewInit, Input } from '@angular/core';
import * as echarts from "echarts";

@Component({
  selector: 'app-body-main',
  standalone: true,
  imports: [],
  templateUrl: './body-main.component.html',
  styleUrl: './body-main.component.css'
})
export class BodyMainComponent {
  
  // mesaSolicitada:number = 0;
  @Input() mesa:string[] = [];
  
  ngAfterViewInit(){
    let myChart = echarts.init(document.getElementById('main'));
  
      // Specify the configuration items and data for the chart
      let option = {
        title: {
          text: 'Ruleta Simulada Sielcon'
        },
        tooltip: {},
        legend: {
          data: ['MESAS']
        },
        xAxis: {
          data: [this.mesa[2]]
        },
        yAxis: {},
        series: [
          {
            name: 'MESAS',
            type: 'bar',
            data: [this.mesa[2]]
          }
        ]
      };
      myChart.setOption(option);
      //body-main.component.ts:40 MESAS series not exists. Legend data should be same with series name or data name.
  }

}

