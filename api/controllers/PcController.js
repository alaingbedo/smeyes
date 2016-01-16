/**
 * PcController
 *
 * @description :: Server-side logic for managing pcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const dns = require('dns');
const _ = require('lodash');

module.exports = {
    init: function(req, res){
        Room.find()
            .then((rooms)=> {
                Promise.all(rooms.map(function (room) {
                        return new Promise((resolve, reject) => {
                            var pcs = [];
                            var r = 1;
                            var p = 1;
                            var hasPost = true;
                            var url = '';

                            function processPC(){
                                if (!hasPost) {
                                    ++r;
                                    p = 1;
                                }
                                url = 'r' + ( r < 10 ? '0' + r : r) + 'p' + (p < 10 ? '0' + p : p) + '.' + room.name + '.sm.cri.epita.net';
                                dns.lookup(url, (err, addr, family) => {
                                    if (addr) {
                                        var pc = {
                                            ip: addr,
                                            room: room.id,
                                            r,
                                            p
                                        };
                                        pcs.push(pc);
                                        hasPost = true;
                                    }
                                    else if (hasPost)
                                        hasPost = false;
                                    else {
                                        resolve(pcs);
                                        return;
                                    }
                                    ++p;
                                    processPC();
                                });
                            }
                            processPC();
                        });
                    }))
                    .then((values) => {
                        const pcs = _.flatten(values);
                        Pc
                            .findOrCreate(pcs)
                            .exec((err, out) => {
                                if (err)
                                    res.status(500).send(err);
                                else{
                                    console.log("pcs created !!!");
                                    res.status(200).send(out);
                                }

                            })
                    })
                    .catch((reason)=>{
                        res.status(500).send(reason);
                    })
            })
            .catch((reason)=>{
                res.status(500).send(reason);
            })
    }

};



