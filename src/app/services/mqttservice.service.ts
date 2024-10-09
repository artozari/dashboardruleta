import { Injectable } from '@angular/core';
import { ConectorComponent, Mesa } from '../conector/conector.component';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Mqttservice {

  conexion : ConectorComponent;
  dato: Mesa = {} as Mesa;
  Mesas: Record<string, Mesa> = {};
  i:number=0;
  mesaArray:number[];
  numberGamesfromTable:number[];

  private mesasSubject = new BehaviorSubject<Record<string, Mesa>>(this.Mesas);

  mesas$: Observable<Record<string, Mesa>> = this.mesasSubject.asObservable();

  
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
      this.i++;
    });

    
  }
  

  obtenerUltimosValDeMesa(keyMesa:number):number[]{
    this.Mesas[keyMesa].winningNumbersData.forEach(element => {
      if (typeof element[3] === "number"){
        this.numberGamesfromTable.length >= 10 && this.numberGamesfromTable.shift();
        this.numberGamesfromTable.push(element[3])
      }
    });
    console.log("jhfv");
    
    return this.numberGamesfromTable;
  }

  obtenerMesas(): Observable<Record<string, Mesa>> {
    return this.mesas$;
  }

  obtenerMesa(nroMesa:number){
    return this.Mesas[nroMesa];
  }
}
