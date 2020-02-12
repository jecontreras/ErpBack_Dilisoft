/**
 * EstadoFacturas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    factura:{
      model: 'facturas',
      required: true
    },
    estado:{
      type: 'string',
      enum:[
        'activo',
        'pendiente',
        'eliminado'
      ],
      defaultsTo: 'activo'
    },
    detalle:{
      type: 'string',
      required:true
    }

  },

};

