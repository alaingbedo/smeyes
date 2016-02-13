/**
 * Connection.js
 *
 * @description :: Object that represent a connection make by an student to a computer
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

let moment = require('moment-timezone');

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
            type : 'string',
            required : true
        },
        end : {
            type : 'string'
        },
        pc : {
            model : 'pc'
        }
    }
};

