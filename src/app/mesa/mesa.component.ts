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
  @Input() min = 0;

  app:App={count:0}as App;

  cantIntervalos = 10;
  intervals = 1; // en minutos
  resCat : string[] = [];
  resCat2 : any[] = [];
  
  resData: number [] = [];
  resData2: [] = [];
  myChart:any;
  option = {};
  
  ngOnChanges(changes: SimpleChanges) {
    // if (changes['data']?.currentValue) {
    //   if (this.myChart) {
    //     this.myChart.disponse();  
    //   }
    // }
    
    this.myChart = echarts.init(document.getElementById(this.dato.tableData[1].toString())); 


  //# Valores de los rangos en la grafica
  const categories = ( () => {
    const ahora = new Date();
    const minInicio = ahora.getMinutes() % this.intervals;
    let horaInicial = new Date(new Date(ahora.getTime() - this.cantIntervalos*this.intervals*60*1000).getTime() - minInicio*60*1000).getTime();
    const res:string[] = [];
    for (let i = 0; i < this.cantIntervalos; i++) {
      horaInicial += this.intervals*60*1000;
      res.push( new Date(horaInicial).toLocaleTimeString("es-ES",{ hour: 'numeric', minute: 'numeric'}) );
    }
    return res;
  })();

  //# Numero de muestra en la parte superior de la grafica
  // const categories2 = ( () => {
  //   if ( this.resCat2.length < this.cantIntervalos) {
  //     for (let i = 1 ; i <= this.cantIntervalos; i++) {
  //       this.resCat2.push(i)
  //     }
  //   }
  //   return this.resCat2;
  // })();

    //# Estas son las lineas para la grafica, no se esta implementado por que no tiene utilidad aun
    // const data2 = ( ()=> {      
    //   let res = [];
    //   let len = 0;
    //   while (len < 10) {
    //     (typeof this.dato.winningNumbersData[0][3] === "number") && res.push(+(this.dato.winningNumbersData[0][3].toFixed(1)));
    //     len++;
    //   }
    //   (typeof this.dato.winningNumbersData[0][3] === "number") && res.push(+(this.dato.winningNumbersData[0][3].toFixed(1)));
    //   res.shift();
    //   return res;
    // })();

    let horaInicial = new Date(Math.floor(Date.now() / (this.intervals * 60 * 1000)) * (this.intervals * 60 * 1000)).getTime();
    

    //# Valores de las barras que muestran el numero de jugadas realizadas en los intervalos de tiempo en la grafica
    const data3 = this.getGamesInAllRange(this.cantIntervalos,this.intervals,this.dato,horaInicial);
    this.getRangos(this.cantIntervalos,this.intervals,horaInicial);
    this.getTsInWinningNumberData(this.dato);

    
       
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
          data: data3
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: ``,
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: '',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: `Total Games: ${data3.reduce((count,val)=>{return count+val},0)}`,
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data3
        }/* ,
        {
          name: 'Dynamic Line',
          type: 'line',
          data: data2
        } */
      ]
    };

    // if (this.dato === {} as Mesa ) {
    //   this.option = {
    //     graphic: {
    //       elements: [
    //         {
    //           type: 'group',
    //           left: 'center',
    //           top: 'center',
    //           children: new Array(7).fill(0).map((val, i) => ({
    //             type: 'rect',
    //             x: i * 20,
    //             shape: {
    //               x: 0,
    //               y: -40,
    //               width: 10,
    //               height: 80
    //             },
    //             style: {
    //               fill: '#5470c6'
    //             },
    //             keyframeAnimation: {
    //               duration: 1000,
    //               delay: i * 200,
    //               loop: true,
    //               keyframes: [
    //                 {
    //                   percent: 0.5,
    //                   scaleY: 0.3,
    //                   easing: 'cubicIn'
    //                 },
    //                 {
    //                   percent: 1,
    //                   scaleY: 1,
    //                   easing: 'cubicOut'
    //                 }
    //               ]
    //             }
    //           }))
    //         }
    //       ]
    //     }
    //   };
    // }

      this.myChart.setOption(this.option);
};

getGamesInAllRange3(cant:number, rango:number, mesa:Mesa, desde:number):number[]{
  let res:number[] = [];
  let datos = this.getTsInWinningNumberData(mesa);
  let rangos = this.getRangos(cant,rango,desde);
  let c = 0;
  let i = 0;
  let j = 0;
  while (cant--) {
    if (datos[i]<rangos[j] && datos[i]>=(rangos[j]-rango*60*1000)) {
      c++;
      res[j]=c;
      i++;
    } else {
      res[j]= c;
      j++;
      c=0;
    }
  }
  // console.log(res);
  return res;
}

getRangos(cant:number,rango:number,desde:number){
  let rangos:number[]=[];
  for (let i = 0; i < cant; i++) {
    rangos.unshift(desde);
    desde = desde - rango*60*1000;
  }
  return rangos;
}

getTsInWinningNumberData(mesa:Mesa):number[]{
  let tGames:number[] = [];
  mesa.winningNumbersData.forEach(element => {
    tGames.push(parseInt(element[1]));
  });
  return tGames;
}


getGamesInAllRange2(cant:number, rango:number, mesa:Mesa, until:number):Object[] {
  let res = [{}];
  for (let i = 0; i < cant; i++) {
      res.unshift({time:new Date(until).toLocaleTimeString("es-ES",{hour:"numeric", minute:"numeric"}),val:this.getLastN_Sums(rango, mesa, until)});
      until -= rango * 60 * 1000;
  }
  return res;
};

getGamesInAllRange(cant:number, rango:number, mesa:Mesa, until:number):number[] {
    let res = [];
    for (let i = 0; i < cant; i++) {
        res.unshift(this.getLastN_Sums(rango, mesa, until));
        until -= rango * 60 * 1000;
    }
    return res;
};

getLastN_Sums(rango:number, mesa:Mesa, until:number):number {
    let totalGamesInLastRange = 0;
    let since = until - rango * 60 * 1000;
    mesa.winningNumbersData.forEach(element => {
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

