/**
* Pc.js
*
* @description :: Object that represent a computer
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        number : {
            type : 'string',
            required : true
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

