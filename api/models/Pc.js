/**
* Pc.js
*
* @description :: Object that represent a computer
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        ip: {
            type : 'string',
            required : true
        },
        r : {
            type : 'integer'
        },
        p : {
            type : 'integer'
        },
        room: {
            model : 'room'
        },
        connections : {
            collection : 'connection',
            via : 'pc'
        }
    }
};

