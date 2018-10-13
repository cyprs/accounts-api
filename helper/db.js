const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://accounts-api:abcd1234@ds241489.mlab.com:41489/accounts-api', {useMongoClient: true});
    mongoose.connection.on('open', ()=>{
        console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err)=>{
        console.log('MongoDB: Error', err);
    });
    mongoose.Promise = global.Promise;
};