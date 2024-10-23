import { Mesa } from "../conector/conector.component"

// Simulacion de datos

let mesa:Mesa = {"ts":1729522760197,"gameNumber":160,"casinoData":["casinoCode","CA_SLCN","name","Casino Sielcon","country","ARG","province","CABA","city","Ciudad Autónoma de Buenos Aires","address","Camarones 2840","mqtt_refresh_time_msec",10],"tableData":["id",1,"name","Table 01","shortName","t01","key","00:15:5d:25:01:bd_8021_9021"],"configData":["wheelType","FR37","tableNumber",5,"skyn","SKIN_F1","chip",1000,"max",1000000,"min",1000,"colorOfLights","green","lightsIntensity",4,"b36",1000,"b18",2000,"b12",3000,"b9",4000,"b7",5000,"b6",6000,"bCha1",30000,"bCha2",20000],"winningNumbersData":[[1551,"1729522748144",156,21,17,true,true,true,null,1],[1561,"1729522751153",157,10,38,true,true,true,null,1],[1571,"1729522754165",158,35,20,true,true,true,null,1],[1581,"1729522757178",159,18,33,true,true,true,null,1],[1591,"1729522760197",160,12,31,true,true,true,null,1]
  ]}

function obtenerLasHoras(mesa:Mesa):string[]{
  let res = mesa.winningNumbersData;
  let horas:string[] = [];
  res.forEach(element => {
    console.log(new Date(element[1]).toLocaleTimeString());
    
    horas.push(new Date(element[1]).toLocaleTimeString())
  });
  return horas;
}

obtenerLasHoras(mesa);

  getGamesInAllRange(6,10,mesa,Date.now())

function getGamesInAllRange(cant:number, rango:number, mesa:Mesa, until:number):number[]{
  let res:number[] = [];
  for (let i = 0; i < cant; i++) {
    res.push(getLastN_Sums(rango, mesa, until));
  }
  return res;
};

function getLastN_Sums(rango:number, mesa:Mesa, until:number):number{
  let totalGamesInLastRange:number=0;//> es posible que esta variable no tenga que inicializarse desde 0 otra vez o guardarse como una global
  let from:number = until - rango * 60 * 1000;
  console.log(new Date(until).toLocaleTimeString());
  for (const data of mesa.winningNumbersData) {
    if (isInRange(parseInt(data[1]), from, until)) {
      totalGamesInLastRange++;
    }
  }
  return totalGamesInLastRange;
};

function isInRange(valor:number, from:number, until:number):boolean{
  let result:boolean=false;
  if (valor >= from && valor <= until) {
    result= true;
  }
  return result;
};