/**
 * ConnectionController
 *
 * @description :: Server-side logic for managing connections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
const moment = require('moment-timezone');

module.exports = {

    test: function(req, res){
        let date = moment();
        res.json({
            day: date.get('day'),
            hour: date.get('hour'),
            minute: date.get('minute')
        });
        //Connections().destroy({}, (err) => {
        //
        //})
    },

    getData: function (req, res) {
/*        let date = moment().tz("Europe/Paris");
        let day = date.get('day');
        let hour = date.get('hour');
        if (day == 7 && hour == 23)
        {
            Connection
                .destroy({})
                .exec((err) => {
                    if (err)
                        res.send(err);
                    res.send('all the connections have been deleted !!!');
                });
        }
        else {*/
            connections().then((d)=> {
                //Get currents connections and losts connections
                Connection.find({end: null})
                    .populate('pc')
                    .then((theConnections)=> {
                        var newConnections = [];
                        var oldConnections = [];
                        var newConnectionsData = [];
                        var oldConnectionsData = [];
                        var persistConnections = [];
                        var result = {'newConnections': null, 'oldConnections': null};

                        //Deconnection
                        oldConnectionsData = d.map((data, index)=> {
                            return {
                                'username': data.username,
                                'promo': data.promo,
                                'pc': {
                                    'ip': data.ip
                                }
                            };
                        });
                        oldConnections = _.differenceWith(theConnections, oldConnectionsData, connectionComparator.compareOldConnections);

                        if (oldConnections.length !== 0) {
                            var cpt = 0;
                            oldConnections.forEach((data2)=> {

                                Connection
                                    .update({id: data2.id}, {end: (moment().tz("Europe/Paris").format('YYYY-MM-DD HH:mm:ss'))})
                                    .then((out)=> cpt += out.length)
                                    .catch((err)=> cpt -= 1);
                            });
                            result.oldConnections = 'There is some update connections';
                        }
                        else {
                            result.oldConnections = 'There is no old connection';
                        }

                        //Connection
                        newConnectionsData = theConnections.map((data, index)=> {
                            return {
                                'username': data.username,
                                'promo': data.promo,
                                'ip': data.pc.ip
                            };
                        });
                        newConnections = _.differenceWith(d, newConnectionsData, connectionComparator.compareNewConnections);

                        if (newConnections.length !== 0) {
                            var cpt2 = 0;
                            persistConnections = newConnections.map((data, index)=> {
                                return {
                                    'username': data.username,
                                    'promo': data.promo,
                                    'start': data.start,
                                    'end': null,
                                    'pc': data.id
                                };
                            });

                            //insérer le tableau de new connection
                            Connection
                                .create(persistConnections)
                                .then(result.newConnections = (out)=> cpt2 = out.length)
                                .catch((err)=>cpt2 = 0);

                            result.newConnections = 'There is some new connections';
                        }
                        else {
                            result.newConnections = 'There is no new connection';
                        }

                        res.status(200).json(result);
                    })
                    .catch((reason)=> {
                        res.status(500).send(reason);
                    });
            });
        //}
    },

    getDataTmp : function(req, res){
        //connections().then((d)=>{
        Connection.find()
            .then((connexions)=> res.status(200).json(connexions))
            .catch((reason)=>{
                res.status(500).send(reason);
            });

        //});
    },

    currentConnectionsInARoom: (req, res) => {
        Connection
            .find()
            .where({
                end: null
            })
            .populate('pc')
            .then((connections) => {
                var results = connections.filter((conn) => conn.pc.room === req.param('id'));
                res.json(results);
            })
            .catch((err) => {
                console.log('err: ', err);
                res.status(400).json(err)
            })
    },

    currentConnectedUsersInARoom: (req, res) => {
        Connection
            .find()
            .where({
                end: null
            })
            .populate('pc')
            .then((connections) => {
                var connections = connections.filter((conn) => conn.pc.room === req.param('id'));
                var results = connections.map((conn) => conn.username);
                res.json(results);
            })
            .catch((err) => {
                console.log('err: ', err);
                res.status(400).json(err)
            })
    },


    currentConnectedNb: (req, res) => {
        Connection
            .find()
            .where({
                end: null
            })
            .then((connections) => {
                res.json({
                    nb: connections.length
                });
            })
            .catch((err) => {
                console.log('err: ', err);
                res.status(400).json(err)
            })
    },

    isConnected: (req, res) => {
        Connection
            .findOne({
                end: null,
                username: req.param('username')
            })
            .populate('pc')
            .then((conn) => {
                res.json(Object.assign({}, conn, {
                    connected: conn !== undefined
                }));
            })
            .catch((err) => {
                console.log('err: ', err);
                res.status(400).json(err)
            })
    }

};

