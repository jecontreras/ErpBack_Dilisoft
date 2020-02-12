/**
 * Facturas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    idContrato:{
      model: 'contrato',
      required:true
    },
    numeroFactura:{
      type:'integer',
      required:true
    },
    facturasAtrasadas:{
      type:'integer',
      required:true
    },
    fechaGenerada:{
      type: 'string',
      required:true
    },
    fechaGeneradaFormat:{
      type: 'string',
      required:true
    },
    fechaCorte:{
      type: 'string',
      required:true
    },
    fechaMaximaCorte:{
      type: 'string',
      required:true
    },
    fechaPagada:{
      type: 'string'
    },
    estadoPago:{
      collection: 'estadoFacturas',
      via: 'factura'
    },
    estado:{
      type: 'string',
      enum:[
        'activo',
        'atrasado',
        'finalizado',
        'eliminado'
      ],
      defaultsTo: 'activo'
    },
    valorIva:{
      type: 'integer',
      required:true
    },
    valorTotal:{
      type: 'integer',
      required:true
    },
    valorRestante:{
      type: 'integer'
    },
    valorApagar:{
      type: 'integer',
      required:true
    },
    detalle:{
      type: 'string',
      required:true
    },
    respuestaServer:{
      type: 'string',
      enum:[
        "enviado",
        "error"
      ]
    }

  },

};

