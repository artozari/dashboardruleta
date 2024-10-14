import { Injectable } from '@angular/core';
import { ConectorComponent, Mesa } from '../conector/conector.component';

@Injectable({
  providedIn: 'root'
})

//# esta es la clase del servicio
export class MqttservService {

  conexion : ConectorComponent;
  dato: Mesa = {} as Mesa;
  Mesas: Record<string, Mesa> = {};
  i:number=0;
  numberGamesfromTable:number[];
  //> el constuctor
  constructor() {
    
    this.numberGamesfromTable = [];
    this.conexion = new ConectorComponent();
    this.conexion.conectar();
    
    this.conexion.client.subscribe(this.conexion.topico);
    
    this.conexion.client.on('message', (topic:string, message:Uint8Array) => {
      this.dato = JSON.parse(message.toString()); 
      this.Mesas[this.dato.tableData[1]] = { 
        ts: this.dato.ts,
        gameNumber: this.dato.gameNumber,
        casinoData: this.dato.casinoData,
        tableData: this.dato.tableData,
        configData: this.dato.configData,
        winningNumbersData: this.dato.winningNumbersData
      };
      this.i++;
    });
  }

  obtenerUltimosValDeMesas(keyMesa:number):void{
    this.Mesas[keyMesa].winningNumbersData.forEach(element => {
      if (typeof element[3] === "number"){
        this.numberGamesfromTable.length >= 10 && this.numberGamesfromTable.shift();
        this.numberGamesfromTable.push(element[3])
      }
    });
  }
  
}
