/**
 * ConnectionController
 *
 * @description :: Server-side logic for managing connections
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {

    test: function(req, res){
        var test = {
            username: 'test',
            promo: 'test',
            start: new Date()
        };
        var conn = new Connection._model(test);
/*        Connection.create({
            username : 'test',
            promo : 'test',
            ip : 'test'
        }).exec(function(err, created) {
            if (!err)
                res.status(200).json(created);
            else
                res.status(400).json(err);
        });*/
        res.json({
            data: conn
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
                    
                    //Deconnection
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
                        var cpt = 0;
                        oldConnections.forEach((data2)=> {    
                            var d = new Date();
                            var offset = new Date().getTimezoneOffset(); 
                            d.setMinutes(d.getMinutes() - offset);
                            
                            Connection
                                .update({id : data2.id}, {end : d})
                                .then((out)=> cpt += out.length)
                                .catch((err)=> cpt -=1);
                        });
                        result.oldConnections = 'There is some update connections';
                    }
                    else{
                        result.oldConnections = 'There is no old connection';
                    }
                
                    //Connection
                    newConnectionsData = theConnections.map((data, index)=>{
                        return {
                            'username' : data.username, 
                            'promo' : data.promo, 
                            'ip' : data.pc.ip
                        };
                    });
                    newConnections = _.differenceWith(d,newConnectionsData, connectionComparator.compareNewConnections);
                    
                    if(newConnections.length !== 0){
                        var cpt2 = 0;
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
                            .then(result.newConnections = (out)=>  cpt2 = out.length)
                            .catch((err)=>cpt2 = 0);
                        
                        result.newConnections = 'There is some new connections';
                    }
                    else{
                        result.newConnections = 'There is no new connection' ;
                    }
            
                    res.status(200).json(result);
                })
            .catch((reason)=>{
            res.status(500).send(reason);
            });
        });
    },
    
    getDataTmp : function(req, res){
        //connections().then((d)=>{
        Connection.find()
        .then((connexions)=> res.status(200).json(connexions))
        .catch((reason)=>{
            res.status(500).send(reason);
        });
            
        //});
    }
    
};

