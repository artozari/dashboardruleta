import { Component } from '@angular/core';
import mqtt from 'mqtt';
// import jsondata from '../jsondata.json';

interface Mesa {
  ts: number;
  gameNumber: number;
  casinoData: (string | number)[];
  tableData: (string | number)[];
  configData: (string | number)[];
  winningNumbersData:dataInWinning[];
}

type dataInWinning = [number,string,number,number,number,boolean,boolean,boolean,number|null,number];

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
      });
    
      // client.on("connect",()=>{
      //   console.log(`Cliente ${clientId} conectado`);
      //   this.numMesas = this.cantMesas+1;
      //   this.data = `Clientes conectados: ${this.numMesas}`;
      //   this.clientes.push(client);
      // })
      
      //# Aqui se pubica el json modiicado con los datos random cada X tiempo
      // setInterval(() => {
      //   client.publish(`${this.topico}${i}`, `${JSON.stringify(this.modJson(jsondata))}`);
      // }, 3000);

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

  public getGamesInAllRange(cant:number, rango:number, mesa:Mesa, until:number):number[]{
    let res:number[] = [];
    for (let i = 0; i < cant; i++) {
      res.push(this.getLastN_Sums(rango, mesa, until));
    }
    return res;
  }

  getLastN_Sums(rango:number, mesa:Mesa, until:number):number{
    let totalGamesInLastRange:number=0;
    let from:number = until - rango * 60 * 1000;
    for (let i = mesa.winningNumbersData.length; i > 0; i--) {
        if(this.isInRange(parseInt(mesa.winningNumbersData[i][1]),from,until)){
          totalGamesInLastRange++;
        };
    }
    return totalGamesInLastRange;
  }

  isInRange(valor:number, from:number, until:number):boolean{
    let result:boolean=false;
    if (valor >= from && valor <= until) {
      result= true;
    }
    return result;
  }
  
}

/*{
  "ts": 1729262393687,
  "gameNumber": 2851,
  "casinoData": [
    "casinoCode",
    "CA_SLCN",
    "name",
    "Casino Sielcon",
    "country",
    "ARG",
    "province",
    "CABA",
    "city",
    "Ciudad Autónoma de Buenos Aires",
    "address",
    "Camarones 2840",
    "mqtt_refresh_time_msec",
    10
  ],
  "tableData": [
    "id",
    1,
    "name",
    "Table 01",
    "shortName",
    "t01",
    "key",
    "00:15:5d:25:01:bd_8021_9021"
  ],
  "configData": [
    "wheelType",
    "FR37",
    "tableNumber",
    5,
    "skyn",
    "SKIN_F1",
    "chip",
    1000,
    "max",
    1000000,
    "min",
    1000,
    "colorOfLights",
    "green",
    "lightsIntensity",
    4,
    "b36",
    1000,
    "b18",
    2000,
    "b12",
    3000,
    "b9",
    4000,
    "b7",
    5000,
    "b6",
    6000,
    "bCha1",
    30000,
    "bCha2",
    20000
  ],
  "winningNumbersData": [
    [
      5693,
      "1729262381670",
      2847,
      13,
      18,
      true,
      true,
      true,
      null,
      1
    ],
    [
      5695,
      "1729262384678",
      2848,
      25,
      27,
      true,
      true,
      true,
      null,
      1
    ],
    [
      5697,
      "1729262387682",
      2849,
      34,
      10,
      true,
      true,
      true,
      null,
      1
    ],
    [
      5699,
      "1729262390684",
      2850,
      28,
      19,
      true,
      true,
      true,
      null,
      1
    ],
    [
      5701,
      "1729262393687",
      2851,
      12,
      21,
      true,
      true,
      true,
      null,
      1
    ]
  ]
}*/