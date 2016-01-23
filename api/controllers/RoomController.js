/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    init: function(req, res){
        var data = [
            {
                subnet: '10.224.31',
                name:   'pasteur'
            },
            {
                subnet: '10.224.32',
                name:   'cisco'
            },
            {
                subnet: '10.224.33',
                name:   'midlab'
            },
            {
                subnet: '10.224.34',
                name:   'labsr'
            },
            {
                subnet: '10.224.35',
                name:   'sm14'
            }/*,
            {
                subnet: '10.224.36',
                name:   'sm-15'
            }*/
        ];

        Room
            .findOrCreate(data)
            .exec((err, out)=>{
                if (!err)
                    console.log("rooms created !!!");
                res.status(200).send(out);
            });
    },
    
    all : function(req, res){
        Room 
            .find()
            .exec((err, out)=>{
                if (!err)
                res.status(200).json(out);
            });
    },
    
    one : function(req, res){
        Room
            .findOne()
            .where({id : req.param('id')})
            .exec((err, out)=>{
                if (!err)
                res.status(200).json(out);
            });
    },
    
   roomsAvailability : function(req, res){
       Room 
            .find()
            .populate('pcs')
            .then((rooms)=>{
                Connection
                    .find({end : null})
                    .populate('pc')
                    .then((connections)=>{
                        var result = [];
                        rooms.forEach((theRoom)=>{
                            var roomAv = {};
                            var nb = connections.filter((d)=> d.pc.room == theRoom.id).length;
                            roomAv.room = theRoom.name;
                            var percent = (nb*100)/theRoom.pcs.length;
                            roomAv.availability = Math.round(percent*100)/100;
                            result.push(roomAv);
                        });
                        res.status(200).send(result);  
                    })
            })
            .catch((reason)=> res.status(200).json(reason))
   } 
    
};

