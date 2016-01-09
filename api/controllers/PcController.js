/**
 * PcController
 *
 * @description :: Server-side logic for managing pcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	init: function(req, res){
        initPc().then((d)=>{
            res.status(200).send(d);
        });
    }
};

