const mongo = require("mongoose");

//const URI = 'mongodb://localhost/facturas-prueba'
const URI = "mongodb+srv://Pruebas:contrasena01+@cluster0.glox7.mongodb.net/facturas?retryWrites=true&w=majority";

mongo.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(db => console.log('BD esta conectada'))
    .catch(err => console.error(err));

module.exports = mongo;