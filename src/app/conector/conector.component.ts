import { Component } from '@angular/core';
import mqtt, { MqttClient } from 'mqtt';
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
    // this.data = 'Sin datos';
    // this.numMesas = 0;
    this.server = "ws://sielcondev01.site:9105";
    this.clientName = "mqttClinte";
    this.topico = "sts/dashboard/local/CA_SLCN/ts";
    this.client = mqtt.connect(this.server, {
      clientId: this.clientName,
      clean: true,
    });
    
    this.client.on("message", (topic:string, message:string) => {
      console.log(message.toString());
      // this.client.end();
    });

    this.client.publish(this.topico, "conectado");
    this.client.subscribe(this.topico);

    this.publish(this.topico, "conectado");
    // this.alconectar();
  };
  
  publish(topic: string, message: string) {
    this.client.publish(topic, message);
    //# Aqui se pubica el json modiicado con los datos random cada X tiempo
    for(let i = 1; i <= this.cantMesas; i++){
      setInterval(() => {
        this.client.publish(`${this.topico}${(i)}}`, `${JSON.stringify(this.modJson(jsondata))}`);
        console.log(`${this.topico}`, `${JSON.stringify(this.modJson(jsondata))}`);
      }, 3000);
    }
  }

  //> TODO generar mas mesas para mostrar en la IU

  alconectar(){
    this.client.on('connect', () => {
          this.client.subscribe('my/topic', { qos: 0 }, (err:Error) => {
              if (err) {
                  console.error(err);
              } else {
                  console.log('Suscrito al tema my/topic');
              }
          }
        );
      }
    );
  }

  conectar():void{
    console.log("conectando...");
    this.client = mqtt.connect(this.server, {
      clientId: this.clientName,
      clean: true,
    });
    this.client.on('connect', () => {
      console.log('Conectado al servidor MQTT');
  })}
  
  modJson(datajson:Mesa) {
    let nuevoDataJason = {
      ...datajson, 
      ts:5,
      gameNumber: Math.floor(Math.random() * 37),
      configData: this.seleccionarAleatorio()
    };
    return nuevoDataJason
  }

  seleccionarAleatorio(){
    const valores = ['fr37', 'fr38', 'am38'];
    const indiceAleatorio = Math.floor(Math.random() * valores.length);
    return valores[indiceAleatorio];
  }
}  