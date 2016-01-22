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
            type : 'date',
            required : true
        },
        end : {
            type : 'date'
        },
        pc : {
            model : 'pc'
        }
    }
};

