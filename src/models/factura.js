const mongoose = require('mongoose');
const { Schema } = mongoose;

const FacturaSchema = new Schema({
    codFactura: { type: String, required: true},
    cliente: { type: String, required: true},
    correo: { type: String, required: true},
    ciudad: { type: String, required: true},
    NIT: { type: String, required: true},
    totalFactura: { type: Number, required: true},
    subTotal: { type: Number, required: true},
    IVA: { type: Number, required: true},
    retencion: { type: Number, required: true},
    fechaCreacion: { type: Date, required: true},
    estado: { type: String, required: true},
    pagada: { type: Boolean, required: true},
    fechaPago: { type: Date, required: false}
});

module.exports = mongoose.model('facturarecord', FacturaSchema);