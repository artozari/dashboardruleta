import { Component, signal, Input } from '@angular/core';
import { Mesa } from '../conector/conector.component';


@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent {

  tables = signal("calor inicial de mesas");
  @Input() dato={};

  mostrarDato(){
    console.log(this.dato);
  }

  constructor() {
    console.log(this.dato);
    
  }
  

}
