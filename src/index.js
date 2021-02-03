const express = require('express');
const cors = require('cors');
const app = express();

const { mongo } = require('./database.js');

// Configuracion
app.set('port', process.env.PORT || 3000);

// Procesamiento 
app.use(express.json());
//app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Rutas
app.use(require('./routes/facturas-rutas.js'));

// Arranque del servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ',app.get('port'));
});
