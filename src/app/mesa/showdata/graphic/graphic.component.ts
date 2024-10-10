import { Component, Input} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [],
  templateUrl: './graphic.component.html',
  styles: ``
})
export class GraphicComponent {

  @Input() gameNumber:number[] = [];
  ngAfterViewInit(){
    let myChart = echarts.init(document.getElementById('main'),"dark");

      // Specify the configuration items and data for the chart
      let option = {
        title: {
          text: 'Mesa'
        },
        tooltip: {},
        legend: {
          data: ['Mesas']
        },
        xAxis: {
          data: [this.gameNumber[0].toString(),this.gameNumber[1].toString(),this.gameNumber[2].toString(),this.gameNumber[3].toString(),this.gameNumber[4].toString()]
        },
        yAxis: {},
        series: [
          {
            name: 'Mesas',
            type: 'bar',
            data: [this.gameNumber[0],this.gameNumber[1],this.gameNumber[2],this.gameNumber[3],this.gameNumber[4]]
          }
        ]
      };

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option);
    }

}