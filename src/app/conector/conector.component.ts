import { Component } from '@angular/core';
import mqtt from 'mqtt';

export interface Mesa {
  ts: number;
  gameNumber: number;
  casinoData: (string | number)[];
  tableData: (string | number)[];
  configData: (string | number)[];
  winningNumbersData:dataInWinning[];
}

type dataInWinning = [number,string,number,number,number,boolean,boolean,boolean,number|null,number];

interface WinningNumber {
  id: number;
  ts: string;
  gameNumber: number;
  game: number;
  rpm: number;
  condition1: boolean;
  condition2: boolean;
  condition3: boolean;
  condition4: boolean;
  drawCount: number;
}

@Component({
  selector: 'app-conector',
  standalone: true,
  imports: [],
  template: `
    <p>
      conector works!
    </p>
  `,
  styles: ``
})

//# MQTT class
export class ConectorComponent {

  clientName:string;
  topico :string;
  server: string ;
  cantMesas: number;
  client: any;

  //# Variables de IU
  
  constructor() {    
    this.cantMesas = 50;
    this.server = "ws://sielcondev01.site:9105";
    this.clientName = "mqttClinte";
    this.topico = "sts/dashboard/local/CA_SLCN/#";
  };
  
  conectar():void{
    this.client = mqtt.connect(this.server, {
      clientId: this.clientName,
      clean: true,
    });
  }
}  

