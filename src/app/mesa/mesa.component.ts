import { Component, Input } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [],
  templateUrl: `./mesa.component.html`,
  styles: ``
})
export class MesaComponent {

  // mesaSolicitada:number = 0;
  @Input() gameNumber:number[] = [];
  
  ngAfterViewInit(){
    let myChart = echarts.init(document.getElementById('main'));
  
      // Specify the configuration items and data for the chart
      let option = {
        xAxis: {
          type: 'category',
          data: [this.gameNumber[0].toString(),this.gameNumber[1].toString(),this.gameNumber[2].toString(),this.gameNumber[3].toString(),this.gameNumber[4].toString(),this.gameNumber[5].toString(),this.gameNumber[6].toString(),this.gameNumber[7].toString(),this.gameNumber[8].toString(),this.gameNumber[9].toString(),this.gameNumber[10].toString(),this.gameNumber[11].toString()]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [this.gameNumber[0],this.gameNumber[1],this.gameNumber[2],this.gameNumber[3],this.gameNumber[4],this.gameNumber[5],this.gameNumber[6],this.gameNumber[7],this.gameNumber[8],this.gameNumber[9],this.gameNumber[10],this.gameNumber[11]],
            type: 'line'
          }
        ]
      };
      myChart.setOption(option);
  }
}