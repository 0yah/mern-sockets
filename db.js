const mongoose = require('mongoose');


const SALT = 10;



//Define a schema
const kittySchema = new mongoose.Schema({
    name:String
});

const Kitten = mongoose.model('Kitten',kittySchema);
const silence = new Kitten({name:'Silence'});
console.log(silence.name);
