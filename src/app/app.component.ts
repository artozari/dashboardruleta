import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { BodyMainComponent } from "./body-main/body-main.component";
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { ConectorComponent, Mesa } from './conector/conector.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConectorComponent, RouterOutlet, CabeceraComponent , MatButtonModule, BodyMainComponent, FooterComponent, BodyMainComponent , MatMenuModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  formSelectTable = new FormGroup({
    mesaInput: new FormControl(''),
  });
  
  mostrarMesa = false;
  inpMesa = document.getElementById("mesaInput");
  conexion : ConectorComponent;
  dato: Mesa = {} as Mesa;
  Mesas: Record<string, Mesa> = {};
  i:number=0;
  mesaArray:string[];

  

  constructor() {

    this.mesaArray = [];
    this.conexion = new ConectorComponent();
    this.conexion.conectar();
    
    this.conexion.client.subscribe(this.conexion.topico);
    
    this.conexion.client.on('message', (topic:string, message:Uint8Array) => {
      this.dato = JSON.parse(message.toString()); 
      this.Mesas[this.i] ={
        key: this.i,
        ts: this.dato.ts,
        gameNumber: this.dato.gameNumber,
        casinoData: this.dato.casinoData,
        tableData: this.dato.tableData,
        configData: this.dato.configData,
        winningNumbersData: this.dato.winningNumbersData
      }
      // console.log(this.Mesas);
      this.i++;
    });
  }
  cambiarMostrarMesa(){
    this.mostrarMesa = !this.mostrarMesa;
    if (this.mostrarMesa) {
      const valMesaInput = this.formSelectTable.get('mesaInput');
      if (valMesaInput) {
        let val = valMesaInput?.value;
        // console.log(val);
        this.obtenerMesaDeMesas(val)
      }else{
        console.log("no hay datos");
        
      }
      
      }
    }
  

  obtenerMesaDeMesas(keyMesa:any):void{
    // console.log(this.Mesas[keyMesa]);
    this.mesaArray[0] = this.Mesas[keyMesa].key.toString();
    this.mesaArray[1] = this.Mesas[keyMesa].ts.toString();
    this.mesaArray[2] = this.Mesas[keyMesa].gameNumber.toString();
    console.log(this.Mesas);
    
  }

}

