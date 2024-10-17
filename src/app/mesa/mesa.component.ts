import { Component,  Input,  Output, OnChanges,  SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
import { Mesa } from '../conector/conector.component';

interface App {
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
  
  app:App={count:0}as App;
  resCat2 : number [] = [];
  resData2: number [] = [];
  @Input() dato = {} as Mesa;
  @Output() nroTable:number=1;
  myChart:any;
  option = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue) {
      if (this.myChart) {
        this.myChart.disponse();  
      }
    }
    
    this.myChart = echarts.init(document.getElementById(this.dato.tableData[1].toString())); 

    //# debe obtenerse los valores de cada 10 minutos redondos utilizando el mod de los minutos actuales entre 10... es la info inferior de la grafica
    const categories = (function () {
      const ahora = new Date();
      const hora = ahora.getHours();
      const minutos = ahora.getMinutes();

      const minutosRedondos = Math.floor(minutos / 10) * 10;
      const horaRedonda = hora - 1;

      const res = [];
      for (let i = 0; i < 6; i++) {
        const minutosIntervalo = horaRedonda * 60 + minutosRedondos + i * 10;
        const horasIntervalo = Math.floor(minutosIntervalo / 60);
        const minutosIntervaloRestantes = minutosIntervalo % 60;
        const intervalo = `${String(horasIntervalo).padStart(2, '0')}:${String(minutosIntervaloRestantes).padStart(2, '0')}`;
        res.push(intervalo);
      }
      return res;
    })();

    //# la barra info superior donde se van acumulando la cantidad de juegos que realizo la mesa
    const categories2 = ( () => {
      if (this.resCat2.length < 10) {
        for (let i = 0; i < 10; i++) {
          (typeof this.dato.winningNumbersData[0][2] == "number")&&(this.resCat2.push(this.dato.winningNumbersData[0][2]));
        }
      }else{
        this.resCat2.shift();
        (typeof this.dato.winningNumbersData[0][2] == "number")&&(this.resCat2.push(this.dato.winningNumbersData[0][2]));
      }      
      return this.resCat2;
    })();

    //# Es la linea que muestra el promedio de jugadas que se realizaron en la mesa en los ultimos 10 minutos
    const data: number[] = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(Math.round(Math.random() * 1000));
      }
      return res;
    })();

    //# Estas son las barras que muestra la cantidad de jugadas que se realizaron en la mesa en los ultimos 10 minutos
    const data2 = ( ()=> {
      // let len = 0;
      // while (len < 10) {
      //   console.log(this.dato.winningNumbersData[0][3]);
        
      //   (typeof this.dato.winningNumbersData[0][3] == "number")&&(this.resCat2.push(+(this.dato.winningNumbersData[0][3].toFixed(1))));
      //   len++;
      // }
      // if (this.resData2.length > 10) {
      //   this.resData2.shift();
      // }
      // return this.resData2;
      
      let res = [];
      let len = 0;
      while (len < 10) {
        (typeof this.dato.winningNumbersData[0][3] == "number") && res.push(+(this.dato.winningNumbersData[0][3].toFixed(1)));
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
          name: 'juegos',
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

      this.myChart.setOption(this.option);
    // }, 600000);

    // this.myChart.setOption(this.option);
    
};

  // cambiarMostrarMesa(){
  //   this.dato.tableData[1];
  // };
    
} 
