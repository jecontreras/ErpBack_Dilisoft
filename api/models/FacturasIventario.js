/**
 * FacturasIventario.js
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
    inventario: {
      model: 'inventario',
      required: true
    },
    precio:{
      type:  'integer',
      required: true
    },
    Addescuento:{
      type: 'integer',
      defaultsTo: 0
    },
    Adtalla:{
      type: 'string'
    },
    codigoTalla:{
      type: 'string'
    },
    ColorTalla: {
      type: 'string'
    },
    totalprecio:{
      type: 'integer',
      required: true
    },
    Adcantidad:{
      type: 'integer',
      required: true
    }
  },

};

