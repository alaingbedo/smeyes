module.exports = {
    
    compareNewConnections : function (arrayValue, otherValue){      
        return ((arrayValue.username == otherValue.username)
                    && (arrayValue.promo == otherValue.promo)
                    && (arrayValue.ip == otherValue.ip)) ? true : false;
    },
    
    compareOldConnections : function (arrayValue, otherValue){      
        return ((arrayValue.username == otherValue.username)
                    && (arrayValue.promo == otherValue.promo)
                    && (arrayValue.pc.ip == otherValue.pc.ip)) ? true : false;
    }
    
};