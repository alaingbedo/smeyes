/**
 * ConnectionController
 *
 * @description :: Server-side logic for managing connections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getData: function(req, res){
        var net = require('net');

        var HOST = 'ns-server.epita.fr';
        var PORT = 4242;

        var client = new net.Socket();
        client.connect(PORT, HOST, function() {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
            // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
            client.write('list_users\n');
        });

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
        var input = '';
        client.on('data', function(data) {

            input = input + data + '\n';
            console.log('DATA: ' + data);
            // Close the client socket completely
            if ( data.indexOf("rep 002 -- cmd end\n") != -1)
            {
                client.destroy();
                res.status(200).send(input);
            }

        });

// Add a 'close' event handler for the client socket
        client.on('close', function() {
            console.log('Connection closed');
        });

    }
};

