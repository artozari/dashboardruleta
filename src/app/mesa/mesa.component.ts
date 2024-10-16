import { Component,  Input,  Output, OnChanges,  SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
import { Mesa } from '../conector/conector.component';
import  {UtilsComponent}  from '../utils/utils.component';


interface App {
  count: number;
}
@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [UtilsComponent],
  templateUrl: `./mesa.component.html`,
  styleUrl: `./mesa.component.css`
})

export class MesaComponent implements OnChanges {

  @Input() dato = {} as Mesa;
  app:App={count:0}as App;
  resCat : [] = [];
  resCat2 : any[] = [];
  
  resData: number [] = [];
  resData2: [] = [];
  @Output() nroTable:number=1;
  myChart:any;
  option = {};
  utils = new UtilsComponent();
  
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
      const minutosIntervalo = (horaRedonda * 60 + minutosRedondos + i * 10)+10;
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
          (typeof this.dato.winningNumbersData[0][2] == "number")&&(this.resCat2.push(this.dato.winningNumbersData[i][2]));
        }
      }else{
          this.resCat2.shift();
        (typeof this.dato.winningNumbersData[4][2] == "number")&&(this.resCat2.push(this.dato.winningNumbersData[4][2]));
      }      
      return this.resCat2;
    })();
    
    //# Es la barra que muestra el numero de jugadas que se realizaron en la mesa en los ultimos 10 minutos
    const data: number[] = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(Math.round(Math.random() * 1000));
      }
      return res;
    })();

    //# Estas son las lineas que muestra la cantidad de jugadas promedio que se realizaron en la mesa en los ultimos 10 minutos
    const data2 = ( ()=> {      
      let res = [];
      let len = 0;
      while (len < 10) {
        (typeof this.dato.winningNumbersData[0][3] == "number") && res.push(+(this.dato.winningNumbersData[0][3].toFixed(1)));
        len++;
      }
      return res;
    })();

    const data3 = this.getGamesInAllRange(this.dato.winningNumbersData.length,0.05,this.dato, new Date().getTime())
    console.log(data3, this.dato.tableData[1]);
    
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
            backgroundColor:  '#283b56' 
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
};

getGamesInAllRange(cant:number, rango:number, mesa:Mesa, until:number):number[]{
  let res:number[] = [];
  for (let i = 0; i < cant; i++) {
    res.push(this.getLastN_Sums(rango, mesa, until));
  }
  return res;
};

getLastN_Sums(rango:number, mesa:Mesa, until:number):number{
  let totalGamesInLastRange:number=0;//> es pocible que esta variable no tenga que inicializarce desde 0 otra vez o guardarse como una global
  let from:number = until - rango * 60 * 1000;
  console.log(new Date(until).toLocaleTimeString());
  for (const data of mesa.winningNumbersData) {
    if (this.isInRange(parseInt(data[1]), from, until)) {
      totalGamesInLastRange++;
    }
  }
  return totalGamesInLastRange;
};

isInRange(valor:number, from:number, until:number):boolean{
  let result:boolean=false;
  if (valor >= from && valor <= until) {
    result= true;
  }
  return result;
};


  // cambiarMostrarMesa(){
  //   this.dato.tableData[1];
  // };
    
} 

