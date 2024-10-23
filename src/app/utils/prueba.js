var mesa = { "ts": 1729706641130, "gameNumber": 1344, "casinoData": ["casinoCode", "CA_SLCN", "name", "Casino Sielcon", "country", "ARG", "province", "CABA", "city", "Ciudad Autónoma de Buenos Aires", "address", "Camarones 2840", "mqtt_refresh_time_msec", 10], "tableData": ["id", 1, "name", "Table 01", "shortName", "t01", "key", "00:15:5d:25:01:bd_8021_9021"], "configData": ["wheelType", "FR37", "tableNumber", 5, "skyn", "SKIN_F1", "chip", 1000, "max", 1000000, "min", 1000, "colorOfLights", "green", "lightsIntensity", 4, "b36", 1000, "b18", 2000, "b12", 3000, "b9", 4000, "b7", 5000, "b6", 6000, "bCha1", 30000, "bCha2", 20000], "winningNumbersData": [[2679, "1729706621115", 1340, 12, 31, true, true, true, null, 1], [2681, "1729706626124", 1341, 19, 11, true, true, true, null, 1], [2683, "1729706631124", 1342, 34, 15, true, true, true, null, 1], [2685, "1729706636129", 1343, 22, 16, true, true, true, null, 1], [2687, "1729706641130", 1344, 17, 26, true, true, true, null, 1]] };
function obtenerLasHoras(mesa) {
    var res = mesa.winningNumbersData;
    var horas = [];
    res.forEach(function (element) {
        console.log(new Date(parseInt(element[1])).toLocaleTimeString("es-ES", { hour: "numeric", minute: "numeric" }));
        horas.push(new Date(parseInt(element[1])).toLocaleTimeString("es-ES", { hour: "numeric", minute: "numeric" }));
    });
    console.log(horas);
    return horas;
}
obtenerLasHoras(mesa);
getGamesInAllRange(5, 10, mesa, Date.now());
function getGamesInAllRange(cant, rango, mesa, until) {
    var res = [];
    for (var i = 0; i < cant; i++) {
        res.push(getLastN_Sums(rango, mesa, until));
    }
    return res;
}
;
function getLastN_Sums(rango, mesa, until) {
    var totalGamesInLastRange = 0;
    var from = until - rango * 60 * 1000;
    console.log(new Date(until).toLocaleTimeString());
    for (var _i = 0, _a = mesa.winningNumbersData; _i < _a.length; _i++) {
        var data = _a[_i];
        if (isInRange(parseInt(data[1]), from, until)) {
            totalGamesInLastRange++;
        }
    }
    return totalGamesInLastRange;
}
;
function isInRange(valor, from, until) {
    var result = false;
    if (valor >= from && valor <= until) {
        result = true;
    }
    return result;
}
;
