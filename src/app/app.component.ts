import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import jsondata from './jsondata.json';

//* local imports
import { BodyMainComponent } from "./body-main/body-main.component";
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import mqtt, { MqttClient } from "mqtt";

interface Mesa {
    ts: number;
    gameNumber: number;
    casinoData: (string | number)[];
    tableData: (string | number)[];
    configData: (string | number)[];
    winningNumbersData: (number|string|boolean|null)[][];
  }


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent , MatButtonModule, BodyMainComponent, FooterComponent, BodyMainComponent , MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  
  // client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
  // client = mqtt.connect("ws://sielcondev01.site:9105");
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

//# Otro metodo que no dio
// constructor() {
//   this.cantMesas = 100;
//   this.data = 'Sin datos';
//   this.numMesas = 0;

//   // Create an array of promises for each client connection
//   const clientPromises = Array.from({ length: this.cantMesas }, (_, i) => {
//     const clientId = `${this.clientIdPrefix}${i + 1}`;
//     const client = mqtt.connect(this.server, {
//       clientId,
//       clean: true,
//     });
  
//     return new Promise(() => { // Capturamos la función resolve
//       client.on("connect", () => { // Cambia el nombre del parámetro
//         console.log(`Cliente ${clientId} conectado`);
//         this.data = `Clientes conectados: ${this.numMesas}`;
//         this.numMesas++;
//         this.clientes.push(client);
//         // resolve(); // Ahora puedes llamar a resolve sin problemas
//       });
//     });
//   });

//   // Wait for all clients to be connected before proceeding
//   Promise.all(clientPromises).then(() => {
//     console.log("Todos los clientes conectados");

//     // Publish JSON data to each client
//     this.clientes.forEach((client, i) => {
//       setInterval(() => {
//         client.publish(`${this.topico}${i + 1}`, `${JSON.stringify(this.modJson(jsondata))}`);
//       }, 3000);
//     });
//   });
// }
  
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