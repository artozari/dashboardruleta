"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Simulacion de datos
let mesa = {"ts":1729541927349,"gameNumber":1200,"casinoData":["casinoCode","CA_SLCN","name","Casino Sielcon","country","ARG","province","CABA","city","Ciudad Autónoma de Buenos Aires","address","Camarones 2840","mqtt_refresh_time_msec",10],"tableData":["id",1,"name","Table 01","shortName","t01","key","00:15:5d:25:01:bd_8021_9021"],"configData":["wheelType","FR37","tableNumber",5,"skyn","SKIN_F1","chip",1000,"max",1000000,"min",1000,"colorOfLights","green","lightsIntensity",4,"b36",1000,"b18",2000,"b12",3000,"b9",4000,"b7",5000,"b6",6000,"bCha1",30000,"bCha2",20000],"winningNumbersData":[[11951,"1729541915349",1196,35,29,true,true,true,null,1],[11961,"1729541918320",1197,12,23,true,true,true,null,1],[11971,"1729541921328",1198,27,27,true,true,true,null,1],[11981,"1729541924356",1199,11,38,true,true,true,null,1],[11991,"1729541927349",1200,20,19,true,true,true,null,1]]};
function obtenerLasHoras(mesa) {
    let res = mesa.winningNumbersData;
    let horas = [];
    let i= 1;
    res.forEach(function (element) {
        console.log(new Date(parseInt(element[1])).toLocaleTimeString()+"i");
        horas.push(new Date(parseInt(element[1])).toLocaleTimeString());
        i++;
    });
    return horas;
}
obtenerLasHoras(mesa);


getGamesInAllRange(2, 10, mesa, 1729542527349);

function getGamesInAllRange(cant, rango, mesa, until) {
    let res = [];
    for (let i = 0; i < cant; i++) {
        res.unshift(getLastN_Sums(rango, mesa, until-1));
        until -= rango * 60 * 1000;
    }
    console.log(res); 
    return res;
}
;
function getLastN_Sums(rango, mesa, until) {
    let totalGamesInLastRange = 0;
    let since = until - rango * 60 * 1000;
    console.log(new Date(until).toLocaleTimeString());
    mesa.winningNumbersData.forEach(element => {
        if (isInRange(parseInt(element[1]),since,until)) {
            totalGamesInLastRange++;
        }
    });
    return totalGamesInLastRange;
}
;
function isInRange(valor, since, until) {
    let result = false;
    if (valor >= since && valor <= until) {
        result = true;
    }   
    return result;
};
