/**
* Connection.js
*
* @description :: Object that represent a connection make by an student to a computer
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        username : {
            type : 'string',
            required : true
        },
        promo : {
            type : 'string',
            required : true
        },
        start : {
            type : 'datetime',
            required : true
        },
        end : {
            type : 'datetime'
        },
        pc:{
            model : 'pc'
        }
    }
};

