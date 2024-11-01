import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';
import { Mesa } from '../conector/conector.component';
import { UtilsComponent } from '../utils/utils.component';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [UtilsComponent],
  templateUrl: `./mesa.component.html`,
  styleUrl: `./mesa.component.css`,
})
export class MesaComponent implements OnChanges {
  @Input() dato: Mesa = {} as Mesa;
  @Input() min: number = 0;

  cantIntervalos = 10;
  intervals = 1; // en minutos
  resCat: string[] = [];
  resCat2: any[] = [];

  resData: number[] = [];
  resData2: [] = [];
  myChart: any = {} as EChartsOption;
  option = {};

  optionWaiting = {};

  ngOnChanges(changes: SimpleChanges) {


    if (changes['dato']?.firstChange === false) {
      if (this.myChart) {
        echarts.dispose(this.myChart);
      }
    }
    else {
      console.log("aqui");
      this.myChart = echarts.init(
        document.getElementById(this.dato.tableData[1].toString())
      );

      // this.myChart.showLoading("default", {
      //   text: 'loading',
      //   color: '#c23531',
      //   textColor: '#000',
      //   maskColor: 'rgba(255, 255, 255, 0.8)',
      //   zlevel: 0,

      //   // Font size. Available since `v4.8.0`.
      //   fontSize: 12,
      //   // Show an animated "spinner" or not. Available since `v4.8.0`.
      //   showSpinner: true,
      //   // Radius of the "spinner". Available since `v4.8.0`.
      //   spinnerRadius: 10,
      //   // Line width of the "spinner". Available since `v4.8.0`.
      //   lineWidth: 5,
      //   // Font thick weight. Available since `v5.0.1`.
      //   fontWeight: 'normal',
      //   // Font style. Available since `v5.0.1`.
      //   fontStyle: 'normal',
      //   // Font family. Available since `v5.0.1`.
      //   fontFamily: 'sans-serif'
      // });
    }



    //# Valores de los rangos en la grafica
    const categories = (() => {
      const ahora = new Date();
      const minInicio = ahora.getMinutes() % this.intervals;
      let horaInicial = new Date(
        new Date(
          ahora.getTime() - this.cantIntervalos * this.intervals * 60 * 1000
        ).getTime() -
        minInicio * 60 * 1000
      ).getTime();
      const res: string[] = [];
      for (let i = 0; i < this.cantIntervalos; i++) {
        horaInicial += this.intervals * 60 * 1000;
        res.push(
          new Date(horaInicial).toLocaleTimeString('es-ES', {
            hour: 'numeric',
            minute: 'numeric',
          })
        );
      }
      return res;
    })();

    const data2 = (() => {
      const startIndex = Math.max(this.dato.winningNumbersData.length - this.cantIntervalos, 0);
      return this.dato.winningNumbersData.slice(startIndex).map(item => item[3]);
    })();

    let horaInicial = Date.now() - (Date.now() % (this.intervals * 60 * 1000));

    //# Valores de las barras que muestran el numero de jugadas realizadas en los intervalos de tiempo en la grafica
    const data3 = this.getGamesInAllRange(
      this.cantIntervalos,
      this.intervals,
      this.dato,
      horaInicial
    );

    this.option = {
      title: {
        // text: 'Dynamic Data'
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
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: true,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: categories,
        },
        {
          type: 'category',
          boundaryGap: true,
          data: data3,
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: ``,
          max: 36,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: false,
          name: '',
          max: 36,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: `Total Games: ${data3.reduce((count, val) => {
            return count + val;
          }, 0)}`,
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data3,
        },
        {
          name: `${this.dato.winningNumbersData[
            this.dato.winningNumbersData.length - 1
          ][3]
            }`,
          type: 'line',
          data: data2,
          smooth: false,
        },
      ],
    };

    this.optionWaiting = {
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: new Array(7).fill(0).map((val, i) => ({
              type: 'rect',
              x: i * 20,
              shape: {
                x: 0,
                y: -40,
                width: 10,
                height: 80,
              },
              style: {
                fill: '#5470c6',
              },
              keyframeAnimation: {
                duration: 1000,
                delay: i * 200,
                loop: true,
                keyframes: [
                  {
                    percent: 0.5,
                    scaleY: 0.3,
                    easing: 'cubicIn',
                  },
                  {
                    percent: 1,
                    scaleY: 1,
                    easing: 'cubicOut',
                  },
                ],
              },
            })),
          },
        ],
      },
    };

    this.myChart.setOption(this.option);
  }

  getGamesInAllRange(cant: number, rango: number, mesa: Mesa, until: number): number[] {
    const res: number[] = [];

    for (let i = cant - 1; i >= 0; i--) {
      const since = until - rango * 60 * 1000;
      let totalGamesInLastRange = mesa.winningNumbersData.reduce((count, element) => {
        const valor = parseInt(element[1]);
        return count + (since < valor && valor <= until ? 1 : 0);
      }, 0);

      res.push(totalGamesInLastRange);
      until = since;
    }

    return res;
  }

}


