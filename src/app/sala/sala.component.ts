import { Component, Input,  SimpleChanges } from '@angular/core';
import { Mesa } from '../conector/conector.component';
import { MesaComponent } from "../mesa/mesa.component";

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [MesaComponent],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent {

  showTables:boolean;
  @Input() mesas:Record<string, Mesa> = {};
  @Input() min:number=0;
  valor:string[]=[];
  tableSelect: string;
  n = 0;
  
  constructor(){
    this.showTables = true;
    this.tableSelect = "";
    this.valor = Object.keys(this.mesas);
    console.log(this.valor);
    this.n = 3;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes[this.min]){
      console.log(this.mesas[1].gameNumber);
      
    }
    this.valor = Object.keys(this.mesas);
    this.n = this.mesas[1].gameNumber;
    console.log(changes);
    console.log(this.valor);
    console.log(this.mesas);
  }

  cambiarMostrarMesa(key:string){
    this.showTables = !this.showTables;
    this.tableSelect = key;
  }
}
