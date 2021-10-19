const mongoose = require('mongoose');

const connector = () => {
 try {
   mongoose.connect('mongodb://localhost:27017', {
     useNewUrlParser: true
   }, (err) => {
    if(err) {
      throw err;
    }
    console.log('Successfully connected to Qualia Database and it is running')
   })     
 } catch (err) {
    console.error('Encoutered error', err);
 }
};

module.exports = {
  connector
};
