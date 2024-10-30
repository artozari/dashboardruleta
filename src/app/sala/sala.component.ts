import { Component, Input, OnChanges,  SimpleChanges } from '@angular/core';
import { Mesa } from '../conector/conector.component';
import { MesaComponent } from "../mesa/mesa.component";

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [MesaComponent],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent implements OnChanges {
 
  @Input() mesas:Record<string, Mesa>={};
  @Input() min:number = 0
  showTables:boolean = true;
  valor:string[]=Object.keys(this.mesas);
  tableSelect: string="";
  
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['mesas']?.currentValue) {
      // this.valor = Object.keys(this.mesas);
      // console.log(this.valor);
    // }
    
  }
  
  cambiarMostrarMesa(key:string){
    this.showTables = !this.showTables;
    this.tableSelect = key;
  }
}
