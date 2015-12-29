/**
 * ConnectionController
 *
 * @description :: Server-side logic for managing connections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    test: function(req, res){
        Connection.create({
            username : 'test',
            promo : 'test',
            ip : 'test'
        }).exec(function(err, created) {
            if (!err)
                res.status(200).json(created);
            else
                res.status(400).json(err);
        });
    },

    getData: function (req, res) {
        var net, HOST, PORT, client, input,
            splitRes1, splitRes2, login, ip, salle, promo;

        net = require('net');

        HOST = 'ns-server.epita.fr';
        PORT = 4242;

        client = new net.Socket();
        client.connect(PORT, HOST, function () {

            console.log('CONNECTED TO: ' + HOST + ':' + PORT);
            // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
            client.write('list_users\n');
        });

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket

        input = '';
        splitRes1 =  [];
        splitRes2 =  [];
        login = '';
        ip = '';
        salle = '';
        promo = '';

        client.on('data', function (data) {

            input = input + data + '\n';
            //console.log('DATA: ' + data /*+ '///'*/);

            //Split of data
            splitRes1 = data.toString().split("\n");

            splitRes1.forEach(function (data, index) {

                splitRes2 = data.toString().split(" ");
                if ((splitRes2[0] !== "") && (splitRes2[2] !== undefined)
                    && (splitRes2[2].indexOf(".") !== -1)) {

                    login = splitRes2[1];
                    ip = splitRes2[2];
                    salle = splitRes2[2];
                    promo = splitRes2[9];
                    
                    Connection.create({
                        username : splitRes2[1],
                        promo : splitRes2[9],
                        ip : splitRes2[2],
                        start : new Date().getTime()
                    })
                    .exec(function(err, connection) {
                    if (!err)
                        console.log('error : ' + err);
                    else
                        console.log('insert with success');
                    });
                    
                    console.log(login + " / " + ip + " / " + salle + " / " + promo);
                }
            });

            // Close the client socket completely
            if (data.indexOf("rep 002 -- cmd end\n") !== -1) {
                client.destroy();
                res.status(200).send(input);
            }

        });

// Add a 'close' event handler for the client socket
        client.on('close', function () {
            console.log('Connection closed');
        });

    };
    
};

