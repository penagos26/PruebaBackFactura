const express = require('express');
const cors = require('cors');
const app = express();

const { mongo } = require('./database.js');

// Configuracion
app.set('port', process.env.PORT || 3000);

// Procesamiento 
app.use(express.json());
app.use(cors());

// Rutas
app.use(require('./routes/facturas-rutas.js'));

// Arranque del servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ',app.get('port'));
});
