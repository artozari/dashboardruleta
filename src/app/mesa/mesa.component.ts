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

  @Input() gameNumber:number[] = [];
  // data:string[]=[];

  // constructor(){
  //   for (let i = 0; i <= this.gameNumber.length; i++) {
  //     this.data.push(this.gameNumber[i].toString())
  //   };  
  //   console.log(this.data);
    
  // }

  ngAfterViewInit(){
    let myChart = echarts.init(document.getElementById('main'));
    
    // Specify the configuration items and data for the chart
    let option = {
        
        xAxis: {
          type: 'category',
          data:[this.gameNumber[0].toString(),this.gameNumber[1].toString(),this.gameNumber[2].toString(),this.gameNumber[3].toString(),this.gameNumber[4].toString()],
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [this.gameNumber[0],this.gameNumber[1],this.gameNumber[2],this.gameNumber[3],this.gameNumber[4]],
            type: 'line',
            smooth: true
          }
        ]
      };
      // this.gameNumber[0].toString(),this.gameNumber[1].toString(),this.gameNumber[2].toString(),this.gameNumber[3].toString(),this.gameNumber[4].toString()


      myChart.setOption(option);
  }
}