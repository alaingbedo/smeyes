/**
* Pc.js
*
* @description :: Object that represent a computer
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        number : {
            type : 'integer',
            required : true
        },
        container : {
            model : 'room'
        },
        connections : {
            collection : 'connection',
            via : 'connectTo'
        }
    }
};

