import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { Mesa } from '../conector/conector.component';
type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./mesa.component.html`,
  styleUrl: `./mesa.component.css`,
})
export class MesaComponent implements OnChanges {
  @Input() dato: Mesa = {} as Mesa;
  @Input() min: number = 0;
  @Input() mostrarSala: boolean = true;
  timeToSemaforo: string[];
  clases: string[] = [
    'allTable',
    'animate1',
    'animate2',
    'animate3',
    'animate4',
  ];
  interval: any;

  cantIntervalos = 5;
  intervals = 5; // en minutos
  resCat: string[] = [];
  resCat2: any[] = [];

  resData: number[] = [];
  resData2: [] = [];
  myChart: any = {} as EChartsOption;
  myChartLoad: any = {} as EChartsOption;
  option = {};
  optionWaiting = {};

  constructor() {
    this.timeToSemaforo = [''];
    this.clases = ['allTable', 'animate1', 'animate2', 'animate3', 'animate4'];
  }

  ngOnInit(): void {
    document.getElementById(this.dato.tableData[1].toString())

  }

  ngAfterViewInit() {
    this.myChart = echarts.init(
      document.getElementById(this.dato.tableData[1].toString())
    );
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
          // restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
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
          max: 70,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          name: '',
          max: 70,
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
        // {
        //   name: `Last Game: ${this.dato.winningNumbersData[
        //     this.dato.winningNumbersData.length - 1
        //   ][3]
        //     }`,
        //   type: 'line',
        //   data: data2,
        //   smooth: false,
        // },
      ],
    };
    this.myChart.setOption(this.option);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['min']?.firstChange === false) {
    //   if (this.myChart) {
    //     echarts.dispose(this.myChart);
    //   }
    // }

    let grp: string = this.mostrarSala ? 'graph' : 'graphIndiv';

    if (changes['dato']?.currentValue) {
      if (this.timeToSemaforo === null) {
        this.timeToSemaforo = ['allTable', 'animate4', grp];
      }
      if (this.dato.status[1].toString() === 'red') {
        this.timeToSemaforo = ['allTable', 'animate3', grp];
      }
      if (this.dato.status[1].toString() === 'yellow') {
        this.timeToSemaforo = ['allTable', 'animate2', grp];
      }
      if (this.dato.status[1].toString() === 'green') {
        this.timeToSemaforo = ['allTable', 'animate1', grp];
      }
    }

    if (changes['dato'].firstChange===false) {
      
      this.myChart = echarts.init(
        document.getElementById(this.dato.tableData[1].toString())
      );

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

      // const data2 = (() => {
      //   const startIndex = Math.max(this.dato.winningNumbersData.length - this.cantIntervalos, 0);
      //   return this.dato.winningNumbersData.slice(startIndex).map(item => item[3]);
      // })();

      //# Valores de las barras que muestran el numero de jugadas realizadas en los intervalos de tiempo en la grafica
      let horaInicial =
        Date.now() - (Date.now() % (this.intervals * 60 * 1000));
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
            // restore: {},
            saveAsImage: {},
          },
        },
        dataZoom: {
          show: false,
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
            max: 70,
            min: 0,
            boundaryGap: [0.2, 0.2],
          },
          {
            type: 'value',
            scale: true,
            name: '',
            max: 70,
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
          // {
          //   name: `Last Game: ${this.dato.winningNumbersData[
          //     this.dato.winningNumbersData.length - 1
          //   ][3]
          //     }`,
          //   type: 'line',
          //   data: data2,
          //   smooth: false,
          // },
        ],
      };

      this.myChart.setOption(this.option);
    }
  }

  getGamesInAllRange(
    cant: number,
    rango: number,
    mesa: Mesa,
    until: number
  ): number[] {
    const res: number[] = [];

    for (let i = cant - 1; i >= 0; i--) {
      const since = until - rango * 60 * 1000;
      let totalGamesInLastRange = mesa.winningNumbersData.reduce(
        (count, element) => {
          const valor = parseInt(element[1]);
          return count + (since < valor && valor <= until ? 1 : 0);
        },
        0
      );

      res.unshift(totalGamesInLastRange);
      until = since;
    }

    return res;
  }
}
