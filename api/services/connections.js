/**
 * Created by kevin gosse on 29/12/2015.
 */
/*var net = require('net');

function deleteDuplicatedData(data) {

}

function parsing(data){
    var splitRes1 =  [];
    var splitRes2 =  [];
}

function getData(){
    var HOST, PORT, client, input,
        splitRes1, splitRes2, login, ip, salle, promo,
        connection, connections;


    HOST = 'ns-server.epita.fr';
    PORT = 4242;

    client = new net.Socket();
    client.connect(PORT, HOST, function () {
        client.write('list_users\n');
    });

    input = '';
    client.on('data', function (data) {

        input = input + data + '\n';

        // Close the client socket completely
        if (data.indexOf("rep 002 -- cmd end\n") !== -1) {
            client.destroy();
            return deleteDuplicatedData(parsing(input));
        }

    });

    client.on('close', function () {
        console.log('Connection closed');
    });

}

module.exports = getData;*/
