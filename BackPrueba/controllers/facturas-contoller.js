const Factura = require('../models/factura');
var nodemailer = require('nodemailer');

const facturaCtrl = {};

facturaCtrl.getListaFacturas = async (req, res) => {
    const resultFacturas = await Factura.find();
    res.json(resultFacturas);
}

facturaCtrl.getClientes = async (req, res) => {
    const registros = await Factura.find();
    const nombres = registros.map(function (personas) { return personas.cliente; });
    var orden = nombres.sort();
    var unicos = orden.filter(function (value, index) {
        return value !== orden[index + 1];
    });
    res.json(unicos);
}

facturaCtrl.getNit = async (req, res) => {
    const nitCliente = await Factura.find({"cliente": req.params.name}).limit(1);
    const dato = nitCliente.map(function (personas) { return personas.NIT; });
    res.json(dato);
}

facturaCtrl.getFactura = async (req, res) => {
    const clienteFirstRecord = await Factura.find({"NIT": req.params.id, "estado": "primerrecordatorio"});
    const clienteSecondRecord = await Factura.find({"NIT": req.params.id, "estado": "segundorecordatorio"});
    const clienteDesactivado = await Factura.find({"NIT": req.params.id, "estado": "desactivado"});
    const clienteFind = clienteFirstRecord.concat(clienteSecondRecord, clienteDesactivado);
    res.json(clienteFind);
}

facturaCtrl.envioEmail = async (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'pruebadeenvio95@gmail.com',
            pass: 'contrasena01+'
        }
    });
    //Facturas a notificar
    const clienteFirstRecord = await Factura.find({"NIT": req.params.id, "estado": "primerrecordatorio"});
    const clienteSecondRecord = await Factura.find({"NIT": req.params.id, "estado": "segundorecordatorio"});
    const facturasNotify = clienteFirstRecord.concat(clienteSecondRecord);
    var Mensaje;
    //Ciclo de notificación:
    for (var registro in facturasNotify){
        var estadoFactura = facturasNotify[registro]["estado"];
        if (estadoFactura == "primerrecordatorio"){
            Mensaje = "Segundo Recordatorio";
        } else if (estadoFactura == "segundorecordatorio"){
            Mensaje = "Desactivado";
        }
        
        var mailOptions = {
            from: 'pruebadeenvio95@gmail.com',
            to: facturasNotify[registro]["correo"],
            subject: 'Notificacion de Factura: ' + facturasNotify[registro]["codFactura"],
            text:   'Señor : ' + facturasNotify[registro]["cliente"] + '\n\n' +
                    'La factura N° ' + facturasNotify[registro]["codFactura"] + ' cambiará de estado a :  ' + Mensaje + '.'
        };
        // Enviamos el email
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
                res.json({
                    "status" : "Error en el envío"
                })
            } else {
                console.log("Correo Enviado");
                res.json({
                    "status" : "Correo Enviado"
                })
            }
        });
    };
}

facturaCtrl.refreshFactura = async (req, res) => {
    await Factura.updateMany({"NIT": req.params.id, "estado": "segundorecordatorio"}, {"$set":{"estado": "desactivado"}});
    await Factura.updateMany({"NIT": req.params.id, "estado": "primerrecordatorio"}, {"$set":{"estado": "segundorecordatorio"}});
    res.json({
        "status": 'Estado Actualizado'
    });
}

facturaCtrl.createFactura = async (req, res) => {
    const facturaCreada = new Factura(req.body);
    await facturaCreada.save();
    res.json({
        'status': 'Factura Guardada'
    });
}


module.exports = facturaCtrl;