import { Component } from '@angular/core';
import mqtt from 'mqtt';
// import WebSocket from 'ws';

// const wss = new WebSocket.Server({ port: 443 });

export interface Mesa {
  ts: number;
  gameNumber: number;
  casinoData: (string | number)[];
  tableData: (string | number)[];
  configData: (string | number)[];
  winningNumbersData: dataInWinning[];
  status: string[];
}

type dataInWinning = [number, string, number, number, number, boolean, boolean, boolean, number | null, number];

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

  clientName: string;
  topico: string;
  server: string;
  client: any;

  //# Variables de IU

  constructor() {
    this.server = "ws://sielcondev01.site:9105";
    this.clientName = "mqttClinteAngel";
    this.topico = "sts/dashboard/local/CA_SLCNSist/#";
  };

  conectar(): void {
    
    this.client = mqtt.connect(this.server, {
      clientId: this.clientName,
      clean: true,
    });
  }
}  