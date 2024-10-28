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

  constructor(){
    this.showTables = true;
    this.tableSelect = "";
    this.valor = Object.keys(this.mesas);
    console.log(this.valor);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.valor = Object.keys(this.mesas);
      console.log(this.valor);
  }

  cambiarMostrarMesa(key:string){
    this.showTables = !this.showTables;
    this.tableSelect = key;
  }
}
