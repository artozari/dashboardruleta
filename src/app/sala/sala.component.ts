<<<<<<< HEAD
import { Component, signal, Input } from '@angular/core';
=======
import { Component, Input, signal, SimpleChanges } from '@angular/core';
>>>>>>> 5fe0964845db375dfa3a3938cb3cce4e3e9cee51
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

<<<<<<< HEAD
  tables = signal("calor inicial de mesas");
  @Input() dato={};

  mostrarDato(){
    console.log(this.dato);
  }

  constructor() {
    console.log(this.dato);
    
  }
  
=======
  showTables:boolean;
  @Input() mesas:Record<string, Mesa> = {};
  valor:string[]=[];
  tableSelect: string;
>>>>>>> 5fe0964845db375dfa3a3938cb3cce4e3e9cee51

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
