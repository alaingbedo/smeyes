/**
 * PcController
 *
 * @description :: Server-side logic for managing pcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	init: function(req, res){
        var newPcs = [];
        
         initPc().then((d)=>{
             Room.find()
             .exec(function(err, rooms){
                 if(err){
                     res.status(500).send(res);
                 }
        
                 var aPc = {};
                 
                 rooms.forEach(function (data, index) {
                     d.forEach(function (data1, index1) {
                        if(data1.ip.startsWith(data.subnet)){
                            aPc = {
                                number : data1.ip.split(".")[3],
                                room : data.id
                            };
                            newPcs.push(aPc);
                        }

                     });
                 });
                 
                 aPc = null;
                 
                 Pc
                    .findOrCreate(newPcs)
                    .exec((err, out)=>{
                        if (!err)
                            console.log("pcs created !!!");
                        res.status(200).send(out);
                    });
             });
         });
     }
};

