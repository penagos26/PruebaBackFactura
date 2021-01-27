const express = require('express');
const router = express.Router();

const facturaPeticiones = require('../controllers/facturas-contoller');

router.get('/lista', facturaPeticiones.getListaFacturas);
router.get('/buscar', facturaPeticiones.getClientes);
router.get('/buscar/nit/:name', facturaPeticiones.getNit);
router.get('/buscar/:id', facturaPeticiones.getFactura);
router.post('/actualizar/:id', facturaPeticiones.envioEmail);
router.put('/actualizar/:id', facturaPeticiones.refreshFactura);
router.post('/creaFact', facturaPeticiones.createFactura);

module.exports = router;