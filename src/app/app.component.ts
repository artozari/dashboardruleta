import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';import { BodyMainComponent } from "./body-main/body-main.component";
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { ReactiveFormsModule } from '@angular/forms';
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

  conexion : ConectorComponent;
  dato: Mesa = {} as Mesa;
  mesas: Record<string, Mesa> = {};
  mesaArray:number[]=[];
  numberGamesfromTable:number[]=[];
  mostrarMesa = true;
  time:string = new Date().toLocaleTimeString();

  constructor(){

    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);

    this.conexion = new ConectorComponent();
    this.conexion.conectar();
    this.conexion.client.subscribe(this.conexion.topico);
    this.conexion.client.on('message', (topic:string, message:Uint8Array) => {
      this.dato = JSON.parse(message.toString()); 
      this.mesas[this.dato.tableData[1]] = {
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

}
