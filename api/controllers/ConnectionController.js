/**
 * ConnectionController
 *
 * @description :: Server-side logic for managing connections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

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
        connections().then((d)=>{
            //Get currents connections and losts connections
            Connection.find({ end : null })
                .populate('pc')
                .then((theConnections)=>{
                    var newConnections = [];
                    var oldConnections = [];
                    var newConnectionsData = [];
                    var oldConnectionsData = [];
                    var persistConnections = [];
                
                    newConnectionsData = theConnections.map((data, index)=>{
                        return {
                            'username' : data.username, 
                            'promo' : data.promo, 
                            'ip' : data.pc.ip
                        };
                    });
                    newConnections = _.differenceWith(d,newConnectionsData, _.isEqual);
                    persistConnections  = newConnections.map((data, index)=>{
                        return {
                            'username' : data.username, 
                            'promo' : data.promo, 
                            'start' : data.start,
                            'end' : null,
                            'pc' : data.id 
                        };
                    });
                    
                    //insérer le tableau de new connection
                    Connection
                        .create(persistConnections)
                        .then((out) => res.status(200).send(out))
                        .catch((err) => res.status(500).send(err));
                
                    oldConnectionsData = d.map((data, index)=>{
                        return {
                            'username' : data.username, 
                            'promo': data.promo,
                            'pc' : {
                                'ip' : data.ip
                            }
                        };
                    });
                    oldConnections = _.differenceWith(theConnections, oldConnectionsData, _.isEqual);
                
                    oldConnections.forEach((data2)=> {
                        Connection
                            .update({ip : data2.ip}, {end : (new Date().getTime())})
                            .then((out)=>res.status(200).send(out))
                            .catch((err) => res.status(500).send(err)); 
                    });
                })
            .catch((reason)=>{
            res.status(500).send(reason);
            });
        });
    },
    
    getDataTmp : function(req, res){
        connections().then((d)=>{
            res.status(200).send(d);
        });
    }
    
};

