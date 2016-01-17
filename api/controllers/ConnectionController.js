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
                    var result = {'newConnections' : null, 'oldConnections' : null};
                
                    newConnectionsData = theConnections.map((data, index)=>{
                        return {
                            'username' : data.username, 
                            'promo' : data.promo, 
                            'ip' : data.pc.ip
                        };
                    });
                    newConnections = _.differenceWith(d,newConnectionsData, connectionComparator.compareNewConnections);
                    
                    if(newConnections.length !== 0){
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
                            .then((out)=>result.newConnections = out)
                            .catch((err)=>result.newConnections = err);
                    }
                    else{
                        result.newConnections = 'There is no new connections' ;
                    }
                
                    oldConnectionsData = d.map((data, index)=>{
                        return {
                            'username' : data.username, 
                            'promo': data.promo,
                            'pc' : {
                                'ip' : data.ip
                            }
                        };
                    });
                    oldConnections = _.differenceWith(theConnections, oldConnectionsData, connectionComparator.compareOldConnections);
                    
                    if(oldConnections.length !== 0){
                        oldConnections.forEach((data2)=> {
                            Connection
                                .update({ip : data2.ip}, {end : (new Date())})
                                .then((out)=>result.oldConnections = out)
                                .catch((err)=>result.oldConnections = err);
                        });
                    }
                    else{
                        result.oldConnections = 'There is no old connections';
                    }
                    res.status(200).json(result);
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

