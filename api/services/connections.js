/**
 * Created by kevin gosse on 29/12/2015.
 */
var net = require('net');
var fs = require('fs');
var moment = require('moment');

/*
 @description :: alert duplicate connection in the collection's array
 */
function alertDuplicatedData(data, dataTable) {
    return dataTable.some(function(data1){
        return ((data.username === data1.username)
        && (data.ip === data1.ip)
        && (data.promo === data1.promo));
    });
}

/*
 @description :: Parsing the data get from the soulnet server
 */
function parsing(data){

    var splitRes1, splitRes2,
        connection, connectionsTable;

    splitRes1 =  [];
    splitRes2 =  [];
    connectionsTable = [];
    connection = {};

    splitRes1 = data.toString().split("\n");

    splitRes1.forEach(function (data, index) {

        splitRes2 = data.toString().split(" ");
        if ((splitRes2[0] !== "") && (splitRes2[2] !== undefined)
            && (splitRes2[2].indexOf(".") !== -1)) {

            connection = {
                username : splitRes2[1],
                promo : splitRes2[9],
                ip : splitRes2[2],
                id : null,
                start : new Date()
            };

            if(!alertDuplicatedData(connection, connectionsTable))
                connectionsTable.push(connection);
            connection = {};
        }

    });

    return connectionsTable;
}

/*
 @description :: get pc id
*/
function getPcOfConnections(ips){
    return Pc.find()
        .then((pcs)=>{
            pcs.forEach((data, index)=>{
                ips.forEach((data1, index1)=>{
                    if(data.ip == data1.ip){
                        data1.id = data.id;
                    }
                });
            });  
            return ips;
    })
        .catch((reason)=>{
           return ips;     
    });
}

/*
 @description :: getting the data get from the soulnet server
 */
function getData(){

    return new Promise((resolve, reject)=>{
        var HOST, PORT, client, connectionsTable, input;
        HOST = 'ns-server.epita.fr';
        PORT = 4242;

        input = '';

        client = new net.Socket();
        client.setTimeout(1000 * 60 * 2);
        client.connect(PORT, HOST, function () {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
            client.write('list_users\n');

        });

        client.on('data', function (data) {
            input += data;

            // Close the client socket completely
            if (data.indexOf("rep 002 -- cmd end\n") !== -1) {
                client.destroy();
                connectionsTable = getPcOfConnections(parsing(input)).filter((data3)=> data3.id);
                resolve(connectionsTable);
            }

        });

        client.on('timeout', function (data) {
            console.log('timeout');
            client.destroy();
            connectionsTable = parsing(input);
            resolve(connectionsTable);
        });

        client.on('close', function () {
            console.log('Connection closed');
        });
    });

}

//module.exports = getDataTmp;
module.exports = getData;

/*
 @description :: getting the data get from test file output.txt
 */

function getDataTmp(){
    return new Promise((resolve, reject)=>{
        fs.readFile('data/output.txt', 'utf8', function (err,data) {
            if (err) {
                resolve(err);
            }

            return resolve(parsing(data));
        });
    });

}
