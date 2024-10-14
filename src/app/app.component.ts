import { Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatButtonModule} from '@angular/material/button';
import { BodyMainComponent } from "./body-main/body-main.component";
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConectorComponent, Mesa } from './conector/conector.component';
import { MesaComponent } from './mesa/mesa.component';
import { SalaComponent } from './sala/sala.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, CabeceraComponent , BodyMainComponent,  FooterComponent, BodyMainComponent , ReactiveFormsModule, MesaComponent, SalaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent{

  formSelectTable = new FormGroup({
    mesaInput: new FormControl(''),
  });

  conexion : ConectorComponent;
  dato: Mesa = {} as Mesa;
  Mesas: Record<string, Mesa> = {};
  mesaArray:number[];
  numberGamesfromTable:number[];
  mostrarMesa = true;
  
  constructor() {  
    this.numberGamesfromTable = [];
    this.mesaArray = [];
    this.conexion = new ConectorComponent();
    this.conexion.conectar();
    this.conexion.client.subscribe(this.conexion.topico);
    this.conexion.client.on('message', (topic:string, message:Uint8Array) => {
      this.dato = JSON.parse(message.toString()); 
      this.Mesas[this.dato.tableData[1]] = { //aqui recupera el id de la mesa y lo guarda en esa posicion en Mesas
        ts: this.dato.ts,
        gameNumber: this.dato.gameNumber,
        casinoData: this.dato.casinoData,
        tableData: this.dato.tableData,
        configData: this.dato.configData,
        winningNumbersData: this.dato.winningNumbersData
      };   
    });
  }
  
  cambiarMostrarMesa(){
    this.mostrarMesa = !this.mostrarMesa;
  }

  // obtenerUltimosValDeMesa(keyMesa:any):void{
  //   this.Mesas[keyMesa].winningNumbersData.forEach(element => {
  //     if (typeof element[3] === "number"){
  //       this.numberGamesfromTable.length >= 10 && this.numberGamesfromTable.shift();
  //       this.numberGamesfromTable.push(element[3])
  //     }
  //   });
  // }

}