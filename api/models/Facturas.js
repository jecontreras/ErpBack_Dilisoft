/**
 * Facturas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    codigo:{
      type: 'string',
      required:true
    },
    creado:{
      model: 'user'
    },
    totalFactura:{
      type: 'integer',
      required: true
    },
    descuento:{
      type: 'integer',
      defaultsTo: 0
    },
    total:{
      type: 'integer',
      defaultsTo: 0
    },
    cliente:{
      type: 'string'
    },
    direccion:{
      type: 'string'
    },
    detalle:{
      type: 'string'
    },
    tipo:{
      type: 'string',
      enum: [
        'factura',
        'compra'
      ],
      required: true
    },
    estado: {
      type: 'string',
      enum:[
        'eliminado',
        'activo',
        'pagada'
      ],
      defaultsTo: 'activo'
    },
  },

};

