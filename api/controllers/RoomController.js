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
                subnet: 31,
                name:   'lab pasteur'
            },
            {
                subnet: 32,
                name:   'lab cisco'
            },
            {
                subnet: 33,
                name:   'midlab'
            },
            {
                subnet: 34,
                name:   'lab pasteur'
            },
            {
                subnet: 35,
                name:   'sm14'
            }
        ];

        Room
            .findOrCreate(data)
            .exec((err, out)=>{
                if (!err)
                    console.log("rooms created !!!");
                res.status(200).send(out);
            });
    }
};

