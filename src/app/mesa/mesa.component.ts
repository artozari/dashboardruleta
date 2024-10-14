<<<<<<< HEAD
import { Component,  Input,  Output,  SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
import { Mesa } from '../conector/conector.component';
=======
import { Component, Input} from '@angular/core';
import { TitletableComponent } from './titletable/titletable.component';
import { ShowdataComponent } from './showdata/showdata.component';
>>>>>>> 0f9c1bdd937d0a07185f8e56b7ca722aa95eea79

@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [TitletableComponent, ShowdataComponent],
  templateUrl: `./mesa.component.html`,
  styles: ``
})

export class MesaComponent {

<<<<<<< HEAD
  @Input() dato = {} as Mesa;
  @Output() nroTable:number=1;
  miNewVar:string="para el commit"
  myChart:any;
  option = {}
  ngOnChanges(changes: SimpleChanges) {
    
    // if (this.myChart) {
    //   this.myChart.remove();
    // }
    this.myChart = echarts.init(document.getElementById(this.dato.tableData[1].toString())); 
      this.option = {
        title: {
          text: `${this.dato.tableData[3]}`
            },
            tooltip: {},
            legend: {
              data: ['Juego']
            },
            xAxis: {
              data: [this.dato.winningNumbersData[0][2],this.dato.winningNumbersData[1][2],this.dato.winningNumbersData[2][2],this.dato.winningNumbersData[3][2],this.dato.winningNumbersData[4][2]]
            },
            yAxis: {},
            series: [
              {
                name: 'Juego',
                type: 'line',
                smooth: false,
                data: [this.dato.winningNumbersData[0][3],this.dato.winningNumbersData[1][3],this.dato.winningNumbersData[2][3],this.dato.winningNumbersData[3][3],this.dato.winningNumbersData[4][3]]
              }
            ]
          };
          
          this.myChart.setOption(this.option);
          // Realizar alguna acción con el nuevo valor
        };

        cambiarMostrarMesa(){
          this.dato.tableData[1];
        }
    
=======
>>>>>>> 0f9c1bdd937d0a07185f8e56b7ca722aa95eea79
}