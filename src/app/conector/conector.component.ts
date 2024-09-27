import { Component } from '@angular/core';
import mqtt from 'mqtt';

export interface Mesa {
  ts: number;
  gameNumber: number;
  casinoData: (string | number)[];
  tableData: (string | number)[];
  configData: (string | number)[];
  winningNumbersData: (number|string|boolean|null)[][];
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
  // data: string = "";
  // numMesas: number;
  
  constructor() {    
    this.cantMesas = 100;
    this.server = "ws://sielcondev01.site:9105";
    this.clientName = "mqttClinte";
    this.topico = "sts/dashboard/local/CA_SLCN/#";
  };
  
  conectar():void{
    this.client = mqtt.connect(this.server, {
      clientId: this.clientName,
      clean: true,
    });

    this.client.on('connect', () => {
      this.client.subscribe(this.topico);
    });

    this.client.on("message", (topic:string, message:string) => {
      // console.log(message.toString());
      console.log("mensaje recibido");
      // this.client.end();
    });
  }

  getPublicaciones(): string {
    let messageReceived: string = '';
  
    this.client.on("message", (topic: string, message: string) => {
      messageReceived = message.toString();
    });
  
    return messageReceived;
  }

  // publish(topic: string, message: string) {
  //   this.client.publish(topic, message);
  //   //# Aqui se pubica el json modiicado con los datos random cada X tiempo
  //   for(let i = 1; i <= this.cantMesas; i++){
  //     setInterval(() => {
  //       this.client.publish(`${this.topico}${(i)}`, `${JSON.stringify(this.modJson(jsondata))}`);
  //       console.log(`${this.topico}`, `${JSON.stringify(this.modJson(jsondata))}`);
  //     }, 10000);
  //   }
  // }
  
  // modJson(datajson:Mesa) {
  //   let nuevoDataJason = {
  //     ...datajson, 
  //     ts:5,
  //     gameNumber: Math.floor(Math.random() * 37),
  //     configData: this.seleccionarAleatorio()
  //   };
  //   return nuevoDataJason
  // }

  // seleccionarAleatorio(){
  //   const valores = ['fr37', 'fr38', 'am38'];
  //   const indiceAleatorio = Math.floor(Math.random() * valores.length);
  //   return valores[indiceAleatorio];
  // }
}  