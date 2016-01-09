var fs = require('fs');

function getPcJson(){
    return new Promise((resolve, reject)=>{
        fs.readFile('data/data.json', 'utf8', function (err,data) {
              if (err) {
                resolve(err);
              }
              var dataJson  = JSON.parse(data);
              return resolve(dataJson);
        });
    });
}

module.exports = getPcJson;