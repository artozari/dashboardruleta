import { Component,  Input,  Output,  SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
import { Mesa } from '../conector/conector.component';

@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [],
  templateUrl: `./mesa.component.html`,
  styles: ``
})

export class MesaComponent {

<<<<<<< HEAD
  @Input() gameNumber:number[] = [];
  @Input() table:Mesa={} as Mesa;
  ngAfterViewInit(){
    let myChart = echarts.init(document.getElementById('main'),"dark");

      // Specify the configuration items and data for the chart
      let option = {
=======
  @Input() dato = {} as Mesa;
  @Output() nroTable:number=1;
  myChart:any;
  option = {}
  ngOnChanges(changes: SimpleChanges) {
    
    // if (this.myChart) {
    //   this.myChart.remove();
    // }
    this.myChart = echarts.init(document.getElementById(this.dato.tableData[1].toString())); 
      this.option = {
>>>>>>> 5fe0964845db375dfa3a3938cb3cce4e3e9cee51
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
    
}