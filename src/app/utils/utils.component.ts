import { Component } from '@angular/core';
import mqtt from 'mqtt';
import jsondata from '../jsondata.json';

interface Mesa {
  ts: number;
  gameNumber: number;
  casinoData: (string | number)[];
  tableData: (string | number)[];
  configData: (string | number)[];
  winningNumbersData: (number|string|boolean|null)[][];
}

@Component({
  selector: 'app-utils',
  standalone: true,
  imports: [],
  template: `
    <p>
      utils works!
    </p>
  `,
  styles: ``
})

export class UtilsComponent {

  clientes : mqtt.MqttClient[] = [];
  clientIdPrefix = 'client_';
  topico = "sts/dashboard/local/CA_SLCN/ta";
  server = "ws://sielcondev01.site:9105";
  cantMesas = 0;

  //# Variables de IU
  data: string = "";
  numMesas: number;
  
  constructor() {

    this.cantMesas = 10;
    this.data = 'Sin datos';
    this.numMesas = 0;


    // clientes: this.client[] = [];
    for (let i = 1; i <= this.cantMesas; i++) {
      const clientId = `${this.clientIdPrefix}${i}`;
      const client = mqtt.connect(this.server, {
        clientId,
        clean: true,
      }
    );
    
    client.on("connect",()=>{
      console.log(`Cliente ${clientId} conectado`);
      this.numMesas = this.cantMesas+1;
      this.data = `Clientes conectados: ${this.numMesas}`;
      this.clientes.push(client);
    })
    
    //# Aqui se pubica el json modiicado con los datos random cada X tiempo
    setInterval(() => {
      client.publish(`${this.topico}${i}`, `${JSON.stringify(this.modJson(jsondata))}`);
    }, 3000);

    client.on("message", (topic, message) => {
      console.log(message.toString());
      client.end();
    });

  };
}  
  seleccionarAleatorio(){
    const valores = ['fr37', 'fr38', 'am38'];
    const indiceAleatorio = Math.floor(Math.random() * valores.length);
    return valores[indiceAleatorio];
  }
  modJson(datajson:Mesa) {
    let nuevoDataJason = {
         ...datajson, 
         ts:5,
         gameNumber: Math.floor(Math.random() * 37),
         configData: this.seleccionarAleatorio()
    };
    return nuevoDataJason
  }

}
