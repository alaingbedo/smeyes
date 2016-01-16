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
                name:   'sr'
            },
            {
                subnet: '10.224.35',
                name:   'sm-14'
            },
            {
                subnet: '10.224.36',
                name:   'sm-15'
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

