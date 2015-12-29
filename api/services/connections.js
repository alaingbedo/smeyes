/**
 * Created by kevin gosse on 29/12/2015.
 */
var net = require('net');

/*
 @description :: delete duplicate connection in the collection's array
 */
function deleteDuplicatedData(data) {

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
                start : new Date().getTime()
            };
            connectionsTable.push(connection);
            connection = {};
        }

    });

    return connectionsTable;
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
        client.connect(PORT, HOST, function () {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
            client.write('list_users\n');

        });

        client.on('data', function (data) {
            input += data;

            // Close the client socket completely
            if (data.indexOf("rep 002 -- cmd end\n") !== -1) {
                client.destroy();
                connectionsTable = parsing(input);
                resolve(connectionsTable);
            }

        });

        client.on('close', function () {
            console.log('Connection closed');
        });
    });

}

module.exports = getData;
