import { Component,  Input,   OnChanges,  SimpleChanges} from '@angular/core';
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

  cantIntervalos = 10;
  intervals = 1; // en minutos
  resCat : [] = [];
  resCat2 : any[] = [];
  
  resData: number [] = [];
  resData2: [] = [];
  myChart:any;
  option = {};
  leng = "es-ES"
  optTime = ``;
  t = (this.leng, this.optTime);
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue) {
      if (this.myChart) {
        this.myChart.disponse();  
      }
    }
    
    this.myChart = echarts.init(document.getElementById(this.dato.tableData[1].toString())); 


  //# debe obtenerse los valores de cada rango de minutos redondos 
  const categories = ( () => {
    const ahora = new Date();
    const minInicio = ahora.getMinutes() % this.intervals;
    let horaInicial = new Date(new Date(ahora.getTime() - this.cantIntervalos*this.intervals*60*1000).getTime() - minInicio*60*1000).getTime();
    const res:string[] = [];
    for (let i = 0; i < this.cantIntervalos; i++) {
      horaInicial += this.intervals*60*1000;
      res.push( new Date(horaInicial).toLocaleTimeString("es-ES",{ hour: 'numeric', minute: 'numeric'}) );
    }
    console.log(res);
    
    return res;
  })();

  //# la barra info superior donde se van acumulando la cantidad de juegos que realizo la mesa
  const categories2 = ( () => {
    if (this.resCat2.length < this.cantIntervalos) {
      
      for (let i = 1 ; i <= this.cantIntervalos; i++) {
        this.resCat2.push(i)
    }
    }
    console.log(this.resCat2);
    
    return this.resCat2;
      // if (this.resCat2.length < this.dato.winningNumbersData.length) {
      //   for (const element of this.dato.winningNumbersData) {//?chekear cantidades si se sincronizan con el de la linea 53
      //     this.resCat2.push(element[2]);
      //   }
      // }else{
      //   this.resCat2.shift();
      //   this.resCat2.push(this.dato.winningNumbersData[4][2]);
      // }      
      // return this.resCat2;
    })();
    
    // const data: number[] = (function () {
      //   let res = [];
      //   let len = 10;
      //   while (len--) {
    //     res.push(Math.round(Math.random() * 1000));
    //   }
    //   return res;
    // })();

    //# Estas son las lineas que muestra la cantidad de jugadas promedio que se realizaron en la mesa en los ultimos 10 minutos
    const data2 = ( ()=> {      
      let res = [];
      let len = 0;
      while (len < 10) {
        (typeof this.dato.winningNumbersData[0][3] === "number") && res.push(+(this.dato.winningNumbersData[0][3].toFixed(1)));
        len++;
      }
      (typeof this.dato.winningNumbersData[0][3] === "number") && res.push(+(this.dato.winningNumbersData[0][3].toFixed(1)));
      res.shift();
      return res;
    })();
    
    // let horaInicial = new Date(new Date(new Date().getTime())
    // .getTime() - new Date().getMinutes() % this.intervals*60*1000).getTime();
    let horaInicial = new Date(Math.floor(Date.now() / (this.intervals * 60 * 1000)) * (this.intervals * 60 * 1000)).getTime();
    console.log(new Date(horaInicial).toLocaleTimeString("es-ES",{ hour: 'numeric', minute: 'numeric' }));
    

    //# Es la barra que muestra el numero de jugadas que se realizaron en la mesa en los ultimos 10 minutos
    // const data3 = this.getGamesInAllRange(this.dato.winningNumbersData.length,this.intervals,this.dato, horaInicial)
    // console.log(data3, this.dato.tableData[1]);    
    console.log(this.getGamesInAllRange2(this.cantIntervalos,this.intervals,this.dato,horaInicial),this.dato.tableData[1]);
    

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
          max: 8,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 8,
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
          // data: data3
        }/* ,
        {
          name: 'Dynamic Line',
          type: 'line',
          data: data2
        } */
      ]
    };

      this.myChart.setOption(this.option);
};


getGamesInAllRange2(cant:number, rango:number, mesa:Mesa, until:number):Object[] {
  let res = [{}];
  for (let i = 0; i < cant; i++) {
      res.unshift({time:new Date(until).toLocaleTimeString("es-ES",{hour:"numeric", minute:"numeric"}),val:this.getLastN_Sums(rango, mesa, until)});
      until -= rango * 60 * 1000;
  }
  // console.log(res, until, rango);
  return res;
};

getGamesInAllRange(cant:number, rango:number, mesa:Mesa, until:number):number[] {
    let res = [];
    for (let i = 0; i < cant; i++) {
        res.unshift(this.getLastN_Sums(rango, mesa, until));
        until -= rango * 60 * 1000;
    }
    // console.log(res, until, rango);
    return res;
};

getLastN_Sums(rango:number, mesa:Mesa, until:number):number {
    let totalGamesInLastRange = 0;
    let since = until - rango * 60 * 1000;
    // console.log(new Date(since).toLocaleTimeString(), new Date(until).toLocaleTimeString());
    
    mesa.winningNumbersData.forEach(element => {
      // console.log(new Date(since).toLocaleTimeString("es-ES",{hour:"numeric",minute:"numeric"}),new Date(parseInt(element[1])).toLocaleTimeString("es-ES",{hour:"numeric",minute:"numeric"}),new Date(until).toLocaleTimeString("es-ES",{hour:"numeric",minute:"numeric"}));
      if (this.isInRange(parseInt(element[1]),since,until)) {
            totalGamesInLastRange++;
        }
    });
    return totalGamesInLastRange;
};

isInRange(valor:number, since:number, until:number):boolean {
    let result = false;
    if (since < valor && valor <= until) {
        result = true;
    }   
    return result;
};
} 

