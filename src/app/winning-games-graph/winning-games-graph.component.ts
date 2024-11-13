import { Component, Input, OnChanges } from '@angular/core';
import * as echarts from 'echarts';
import { Mesa } from '../conector/conector.component';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-winning-games-graph',
  standalone: true,
  imports: [],
  templateUrl: './winning-games-graph.component.html',
  styleUrl: './winning-games-graph.component.css'
})
export class WinningGamesGraphComponent implements OnChanges {
  @Input() dato: Mesa = {} as Mesa;
  @Input() min: number = 0;
  myChart: any = {} as EChartsOption;
  option = {};
  cantIntervalos = 10;
  data3: number[] = [];

  constructor() {

  }

  ngOnChanges() {

    const data2 = (() => {
      const startIndex = Math.max(this.dato.winningNumbersData.length - this.cantIntervalos, 0);
      return this.dato.winningNumbersData.slice(startIndex).map(item => item[3]);
    })();

    const dat = (() => {
      this.data3 = this.dato.winningNumbersData.slice(-10).map(item => item[3]);
      return this.data3;
    })();

    this.myChart = echarts.init(document.getElementById("main"));

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
        data: data2
      },
      yAxis: [{
        type: 'value',
        scale: true,
        name: '',
        max: 37,
        min: 0,
        boundaryGap: [0.2, 0.2],
      }, {
        type: 'value',
        scale: true,
        name: '',
        max: 37,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },],
      series: [
        {
          name: `Last Game: ${this.dato.winningNumbersData[
            this.dato.winningNumbersData.length - 1
          ][3]
            }`,
          type: 'line',
          data: data2,
          smooth: false,
        },
      ],
    };

    this.option && this.myChart.setOption(this.option);
  }
}
