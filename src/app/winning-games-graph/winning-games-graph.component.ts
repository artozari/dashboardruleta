import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';
import { Mesa } from '../conector/conector.component';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-winning-games-graph',
  standalone: true,
  imports: [],
  templateUrl: './winning-games-graph.component.html',
  styleUrl: './winning-games-graph.component.css',
})
export class WinningGamesGraphComponent implements OnChanges {
  @Input() dato: Mesa = {} as Mesa;
  // @Input() min: number = 0;
  mySalaChart: any = {} as EChartsOption;
  option = {};
  cantIntervalos = 10;
  data3: number[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dato']) {
      // if (this.mySalaChart) {
      //   echarts.dispose(this.mySalaChart);
      // }

      const data2 = (() => {
        let datos = this.dato.winningNumbersData
          .slice(0, this.cantIntervalos)
          .map((item) => item[3]);
        datos.reverse();
        return datos;
      })();

      this.mySalaChart = echarts.init(document.getElementById('main'));

      this.option = {
        title: {
          text: this.dato.tableData[3],
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56',
            },
          },
        },
        dataZoom: {
          show: true,
          start: 0,
          end: 100,
        },
        legend: {},
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          data: data2,
        },
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '',
            max: 37,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
          {
            type: 'value',
            scale: true,
            name: '',
            max: 37,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
        ],
        series: [
          {
            name: `Last Game: ${this.dato.winningNumbersData[0][3]}`,
            type: 'line',
            data: data2,
            smooth: false,
          },
        ],
      };

      this.option && this.mySalaChart.setOption(this.option);
    }
  }
}
