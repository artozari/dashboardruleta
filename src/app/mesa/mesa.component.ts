import { Component,  Input,  Output, OnChanges,  SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
import { Mesa } from '../conector/conector.component';

interface app {
  count: number;
}
@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [],
  templateUrl: `./mesa.component.html`,
  styleUrl: `./mesa.component.css`
})

export class MesaComponent implements OnChanges {
  
  app:app={}as app;
  @Input() dato = {} as Mesa;
  @Output() nroTable:number=1;
  myChart:any;
  option = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      if (this.myChart) {
        this.myChart.disponse();
      }
    }
    
    this.myChart = echarts.init(document.getElementById(this.dato.tableData[1].toString())); 

    const categories = (function () {
      let now = new Date();
      let res = [];
      let len = 10;
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
        now = new Date(+now - 600000);
      }
      return res;
    })();
    const categories2 = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(10 - len - 1);
      }
      return res;
    })();
    const data: number[] = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(Math.round(Math.random() * 1000));
      }
      return res;
    })();
    const data2: number[] = (function () {
      let res = [];
      let len = 0;
      while (len < 10) {
        res.push(+(Math.random() * 10 + 5).toFixed(1));
        len++;
      }
      return res;
    })();
    
    this.option = {
      title: {
        // text: 'Dynamic Data'
        text: this.dato.tableData[3]
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: categories
        },
        {
          type: 'category',
          boundaryGap: true,
          data: categories2
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: 'Price',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: 'Dynamic Bar',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data
        },
        {
          name: 'Dynamic Line',
          type: 'line',
          data: data2
        }
      ]
    };
    
    this.app.count = 11;
    setInterval( () => {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

      data.shift();
      data.push(Math.round(Math.random() * 1000));
      data2.shift();
      data2.push(+(Math.random() * 10 + 5).toFixed(1));

      categories.shift();
      categories.push(axisData);
      categories2.shift();
      categories2.push(this.app.count++);

      this.myChart.setOption({
        xAxis: [
          {
            data: categories
          },
          {
            data: categories2
          }
        ],
        series: [
          {
            data: data
          },
          {
            data: data2
          }
        ]
      });
    }, 600000);

    this.myChart.setOption(this.option);
};

  // cambiarMostrarMesa(){
  //   this.dato.tableData[1];
  // };
    
} 