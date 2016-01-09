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
                subnet: '10.41.176',
                name:   'lab pasteur'
            },
            {
                subnet: '10.41.170',
                name:   'lab cisco'
            },
            {
                subnet: '10.41.179',
                name:   'midlab'
            },
            {
                subnet: '10.41.174',
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

