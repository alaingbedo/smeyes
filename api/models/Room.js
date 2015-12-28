/**
* Room.js
*
* @description :: Object that represents computer room
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        subnet : {
            type : 'integer',
            required : true
        },
        name : {
            type : 'string',
            required : true
        },
        pcs : {
            collection : 'pc',
            via : 'container'
        }
    }
};

